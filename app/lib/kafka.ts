// lib/kafka.ts - Kafka configuration
import { Kafka, KafkaConfig } from 'kafkajs';

const kafkaConfig: KafkaConfig = {
  clientId: 'user-activity-tracker',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
};

export const kafka = new Kafka(kafkaConfig);