import { KMSClient, GenerateDataKeyCommand, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";
import { string } from "zod";


interface EncryptionResult {
  ciphertext: Uint8Array;
  encryptedDataKey: Uint8Array;
}

const keyId = process.env.KeyId
if (!keyId) throw new Error('KeyId environment variable is required');
const validatedKeyId = keyId as string;

const region = process.env.region || 'us-east-1'


class KMSExample {
  private kmsClient: KMSClient;


  constructor(region: string = 'us-east-1', public keyId: string) {
    this.kmsClient = new KMSClient({ region });
    
  }

  
  // Generate a data key using envelope encryption
  async generateDataKey(): Promise<{ plaintextKey: Uint8Array; encryptedKey: Uint8Array }> {
    const command = new GenerateDataKeyCommand({
      KeyId: this.keyId,
      KeySpec: 'AES_256', 
    });

    try {
      const response = await this.kmsClient.send(command);
      return {
        plaintextKey: response.Plaintext!,
        encryptedKey: response.CiphertextBlob!
      };
    } catch (error) {
      console.error('Error generating data key:', error);
      throw error;
    }
  }

  // Encrypt data using the generated data key (local encryption)
  async encryptData(plaintext: string,): Promise<EncryptionResult> {
    // Step 1: Generate data key from KMS
    const { plaintextKey, encryptedKey } = await this.generateDataKey();
    
    // Step 2: Use crypto library for local encryption (AES-GCM)
    const crypto = await import('crypto');
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, plaintextKey, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    // Step 3: Combine IV + authTag + encrypted data
    const ciphertext = Buffer.concat([iv, authTag, encrypted]);
    
    return {
      ciphertext,
      encryptedDataKey: encryptedKey
    };
  }

  // Decrypt data using KMS
  async decryptData(encryptedResult: EncryptionResult): Promise<string> {
    const { ciphertext, encryptedDataKey } = encryptedResult;
    
    // Step 1: Decrypt the data key using KMS
    const decryptCommand = new DecryptCommand({
      CiphertextBlob: encryptedDataKey,
      KeyId: this.keyId,
    });
    
    const response = await this.kmsClient.send(decryptCommand);
    const plaintextKey = response.Plaintext!;
    
    // Step 2: Extract IV and auth tag from ciphertext
    const iv = ciphertext.slice(0, 16);
    const authTag = ciphertext.slice(16, 32);
    const encryptedData = ciphertext.slice(32);
    
    // Step 3: Decrypt locally using AES-GCM
    const crypto = await import('crypto');
    const algorithm = 'aes-256-gcm';
    
    const decipher = crypto.createDecipheriv(algorithm, plaintextKey, iv);
    decipher.setAuthTag(authTag);
    
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  }
}

// Usage example
async function example() {
  const kmsExample = new KMSExample(region, validatedKeyId);
  const sensitiveData = 'Credit card number: 4111-1111-1111-1111';
  
  try {
    // Encrypt
    const encrypted = await kmsExample.encryptData(sensitiveData);
    console.log('Data encrypted successfully');
    
    // Decrypt
    const decrypted = await kmsExample.decryptData(encrypted);
    console.log('Decrypted data:', decrypted);
  } catch (error) {
    console.error('Encryption/decryption failed:', error);
  }
}