#include<string.h>
#include<stdlib.h>
#include<stdio.h>

typedef struct {
    int id;
    char name[];
} Family ;


int main() {
    size_t name_size = 50;
    Family* family = (Family*)malloc(sizeof(Family) + name_size);
    family->id = 2;
    strncpy(family->name, "hassan laqrabti is a good person", name_size - 1);
    family->name[name_size - 1] = '\0';  // Ensure null termination

    printf("%c\n", family->name[name_size - 2]);

  










    // int length = strlen("hassan");

    // char* str = "banana";
    // size_t len = strlen(str); 
    // str[1] = 'b';
    // printf("%s\n", str);

    // char* buffer = "banana";  // Stack memory
    // buffer[2] = 'j';
    // printf("%s\n", buffer);

    // for (size_t i = 0; i < len; i++) {
    //     if (str[i]  == 'a') {
    //         printf("Found 'a' at index %zu\n", i);
    //     }
    // }


//     puts("__________\n");
//     char* name[] = {"hassan", "nazih", "mehdi"};
//     // for (size_t i = 0; i < sizeof(name)/sizeof(name[0]); i++) {
//     //     printf("the pointer is %p and the value it holds is %s\n", name[i], name[i]);
//     // }
    
//     char** ptr = name;
//     size_t count = sizeof(name) / sizeof(name[0]);
//     for (size_t i = 0; i < count; i++ ){
//         printf("%p and the content is: %s\n", (void*)(ptr + i), *(ptr + i));
// }
    
    // puts("__________\n");
    // char* str1 = "hello";
    // printf("%p\n", str1);
    // printf("%p\n", &str1[0]);
    // printf("%c\n", str1[0]);
    // printf("%s\n", str1);
    // printf("%p\n", &str1 + 2);


    return 0;
}



























    // // Check if correct number of arguments provided
    // if (argc != 4) {
    //     printf("Usage: %s <number> <operator> <number>\n", argv[0]);
    //     printf("Example: %s 5 + 3\n", argv[0]);
    //     return 1;
    // }
    
    // // Parse arguments
    // double num1 = atof(argv[1]);
    // char operator = argv[2][0];  // First character of 2nd argument
    // double num2 = atof(argv[3]);
    // double result;
    
    // // Perform calculation based on operator
    // switch (operator) {
    //     case '+':
    //         result = num1 + num2;
    //         break;
    //     case '-':
    //         result = num1 - num2;
    //         break;
    //     case '*':
    //         result = num1 * num2;
    //         break;
    //     case '/':
    //         if (num2 == 0) {
    //             printf("Error: Division by zero!\n");
    //             return 1;
    //         }
    //         result = num1 / num2;
    //         break;
    //     default:
    //         printf("Error: Invalid operator '%c'\n", operator);
    //         return 1;
    // }
    
    // printf("Result: %.2f %c %.2f = %.2f\n", num1, operator, num2, result);
//     return 0;
// }


// #include<stdlib.h>
// #include<stdio.h>
// #include<string.h>


// typedef struct Products {
//     int id;
//     char* name;
// } Pr;

// // Pr* fill_data(int id, const char* new_name) {
// //     Pr* prd_instance = malloc(sizeof(Pr));
// //     prd_instance->id = id;
// //     prd_instance->name = malloc(sizeof(*new_name));
// //     return prd_instance;
// // }

// int main(void) {

//     // char FirstName[20] = "Laqrabti ";
//     // char LastName[] = "Hassan";
//     // printf("memory address of the first name %p\n", FirstName);
//     // printf("first name is: %s", FirstName);

//     // char* Result = strcat(FirstName, LastName);
//     // printf("Fulls name is %s\n", Result);

//     int x = 4;
//     int* ptr1 = &x;
//     int** ptr2 = &ptr1;

//     printf("Memory address of pointer1 ptr1: %p\n", ptr1);
//     printf("Memory address of pointer2: ptr2: %p\n", ptr2);
//     printf("dereferencing ptr2:%p\n", *ptr2);
//     printf("Getting the value of x by dereferencing the ptr2 twice: %d\n", **ptr2);


//     return 0;
// }
















// #include<stdlib.h>
// #include<stdio.h>
// #define Table_size 10

// typedef struct {
//     int key;
//     void *data;
//     struct hash_node *next;
// } hash_node ;

// typedef struct {
//     hash_node *buckets[Table_size];
// } hash_table;

// int main() {
//     int arr[3] = {1,2,3};
//     int size = sizeof(arr)/sizeof(arr[0]);
    
//     printf("size of the array %d\n", size);
//     for (int i = 0; i < size; i++) {
//         printf("element at index %d is %d\n", i, arr[i]);
//     }
//     return 0;
// }



// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>

// #define TABLE_SIZE 10

// struct hash_node {
//     char *key;
//     char *value;
//     struct hash_node *next;
// };

// struct hash_table {
//     struct hash_node *buckets[TABLE_SIZE];
// };

// /* simple strdup replacement (portable) */
// char *my_strdup(const char *s) {
//     if (!s) return NULL;
//     size_t n = strlen(s) + 1;
//     char *p = malloc(n);
//     if (p) memcpy(p, s, n);
//     return p;
// }

// /* simple hash: length mod TABLE_SIZE (demo only) */
// unsigned int hash_idx(const char *key) {
//     return (unsigned int)(strlen(key)) % TABLE_SIZE;
// }

// /* create node: duplicates key and value */
// struct hash_node *create_node(const char *key, const char *value) {
//     struct hash_node *n = malloc(sizeof *n);
//     if (!n) return NULL;
//     n->key = my_strdup(key);
//     n->value = my_strdup(value);
//     n->next = NULL;
//     if ((n->key == NULL) || (n->value == NULL)) { /* allocation failure cleanup */
//         free(n->key); free(n->value); free(n); return NULL;
//     }
//     return n;
// }

// /* append at tail: allows duplicate keys as separate nodes */
// int insert_append(struct hash_table *ht, const char *key, const char *value) {
//     unsigned int idx = hash_idx(key);
//     struct hash_node *node = create_node(key, value);
//     if (!node) return -1;
//     if (ht->buckets[idx] == NULL) {
//         ht->buckets[idx] = node;
//         return 0;
//     }
//     struct hash_node *cur = ht->buckets[idx];
//     while (cur->next) cur = cur->next;
//     cur->next = node;
//     return 0;
// }

// /* lookup: returns first matching value (first-inserted for append policy) */
// char *lookup_first(struct hash_table *ht, const char *key) {
//     unsigned int idx = hash_idx(key);
//     struct hash_node *cur = ht->buckets[idx];
//     while (cur) {
//         if (strcmp(cur->key, key) == 0) return cur->value;
//         cur = cur->next;
//     }
//     return NULL;
// }

// /* debug: print all buckets */
// void print_all(struct hash_table *ht) {
//     for (int i = 0; i < TABLE_SIZE; ++i) {
//         printf("Bucket[%d]: ", i);
//         struct hash_node *cur = ht->buckets[i];
//         while (cur) {
//             printf("[%s=%s] -> ", cur->key, cur->value);
//             cur = cur->next;
//         }
//         printf("NULL\n");
//     }
// }

// /* free everything */
// void destroy_table(struct hash_table *ht) {
//     for (int i = 0; i < TABLE_SIZE; ++i) {
//         struct hash_node *cur = ht->buckets[i];
//         while (cur) {
//             struct hash_node *tmp = cur;
//             cur = cur->next;
//             free(tmp->key);
//             free(tmp->value);
//             free(tmp);
//         }
//         ht->buckets[i] = NULL;
//     }
// }

// int main(void) {
//     struct hash_table ht;
//     for (int i = 0; i < TABLE_SIZE; ++i) ht.buckets[i] = NULL;

//     /* Insert sample keys (including duplicate "hassan") */
//     insert_append(&ht, "bob",    "data_bob");
//     insert_append(&ht, "hassan", "data1");
//     insert_append(&ht, "saad",   "data_saad");
//     insert_append(&ht, "hassan", "data2"); /* duplicate key -> new node appended */

//     /* Print state */
//     printf("Hash table contents:\n");
//     print_all(&ht);

//     /* Lookup - returns first matching value for "hassan" */
//     char *v = lookup_first(&ht, "hassan");
//     printf("\nlookup(\"hassan\") -> %s\n", v ? v : "(not found)");

//     destroy_table(&ht);
//     return 0;
// }





// #include <stdlib.h>
// #include <stdio.h>

// int main() {
//     int *arr = NULL;        
//     int size = 0;          
//     int capacity = 0;       
//     int input;
    
//     while(1) {
//         printf("Enter number (-1 to stop): ");
//         scanf("%d", &input);
//         if(input == -1) break;
        
//         // Grow array if needed
//         if(size >= capacity) {
//             capacity = (capacity == 0) ? 2 : capacity * 2;  
//             arr = realloc(arr, capacity * sizeof(int));
//         }
        
//         arr[size++] = input;  
//     }
    
//     // Process array
//     for(int i = 0; i < size; i++) {
//         printf("%d ", arr[i]);
//     }
    
//     free(arr);
//     return 0;
// }














// #include<stdlib.h>
// #include<stdio.h>
// #include<string.h>
// #include<stdbool.h>


// typedef struct {
//     size_t rows;
//     size_t cols;
//     double **data;
//     size_t ref_count;
// } Matrix;

// Matrix* matrix_create(size_t rows, size_t cols) {
//     // Validate input parameters
//     if (rows == 0 || cols == 0) {
//         fprintf(stderr, "Error: Matrix dimensions cannot be zero\n"); 
//         return NULL;
//     }

//     // Check for potential overflow
//     if (rows > SIZE_MAX / rows/ sizeof(double) ) {
//         fprintf(stderr, "Error: Matrix dimensions would cause overflow");
//         return NULL;
//     }

//     Matrix *matrix = malloc(sizeof(Matrix));
//     if (!matrix) {
//         perror("failed to allocate matrix struct");
//         return NULL;
//     }

//     matrix->cols = cols;
//     matrix->rows = rows;
//     matrix->ref_count = 1;







    // Allocate main struct


    // Initialize dimensions


    // Allocate row pointers


    // Zero-initialize row pointers for safe cleanup


    // Allocate each row with single contiguous block for better cache performance



    // Set up row pointers to point into the contiguous block


    // Reference counting for shared ownership



    // Processing functions - NO memory management inside
// }





























































// #include<stdio.h>
// #include<stdlib.h>
// #include<limits.h>

// typedef struct {
//     int width;
//     int height;
//     unsigned char *pixels;
// } Image;

// Image* create_image(int width, int height) {
//     Image *image = malloc(sizeof(Image));
//     if (!image) {
//         fprintf(stderr, "Failed to allocate image struct\n");
//     }
//     image->height = height; 
//     image->width = width;
//     size_t size = height * width;
//     image->pixels = malloc(size * sizeof(unsigned char));
//     if (!image->pixels) {
//         fprintf(stderr, "Failed to allocate pixel data\n");
//     }
//     free(image); 
//     return NULL;

//     //Inizialize pixels to zero

// }


// int main(void) {
//     printf("sizeof(unsigned char) = %zu\n", sizeof(unsigned char));
//     printf("CHAR_BIT = %d\n", CHAR_BIT); // usually 8

//     int neg = -1;
//     size_t s = (size_t)neg; // converts -1 to very large unsigned value
//     printf("neg = %d, s = %zu\n", neg, s);
    
//     unsigned int a = 4000000000u; // ~4 billion, fits in 32-bit unsigned
//     unsigned int b = 4000000000u;
//     unsigned int s = a + b;       // wraps modulo 2^32

//     printf("a = %u\n", a);
//     printf("b = %u\n", b);
//     printf("a + b (unsigned wrap) = %u\n", s);
//     printf("UINT_MAX = %u\n", UINT_MAX);

//     // show mathematics: (a + b) mod 2^32
//     unsigned long long expected = (unsigned long long)a + (unsigned long long)b;
//     printf("Mathematical sum = %llu\n", expected);
//     printf("Wrapped result = %u (which equals mathematical sum mod 2^32)\n", s);

//     uint32_t a = 4000000000u;
//     uint32_t b = 4000000000u;
//     uint32_t sum = a + b;                      // wraps modulo 2^32
//     unsigned long long math_sum = (unsigned long long)a + b; // full math

//     printf("a + b (mathematical) = %llu\n", math_sum);
//     printf("a + b (uint32_t wrap)  = %u\n", sum); // equals math_sum % 2^32

//     printf("sizeof(short) = %zu\n", sizeof(short));
//     printf("sizeof(int)   = %zu\n", sizeof(int));
//     printf("sizeof(long)  = %zu\n", sizeof(long));
//     printf("sizeof(long long) = %zu\n", sizeof(long long));
//     printf("sizeof(void*) = %zu\n", sizeof(void*));

//     return 0;
// }


// #include <stdio.h>
// #include <time.h>

// typedef enum {Membership_tier, Silver, Gold, Platinum} Membership_tier;

// // Use STRUCT for order details (multiple data)
// typedef struct {
//     int Customer_ID;
//     char phone_number[20];
//     Membership_tier membership_tier;
//     float Total_lifetime_purchases;
//     time_t Account_creation;
// } Customer;

// bool add_new_customer(Customer *customer) {
    
// }



// bool Update_customer_purchases() {

// }

// Calculate_rewards() {

// }

// Generate_reports() {
    
// }



// int main() {
//     Customer *customers[] = malloc(1000 * sizeof(Customer));
 

//     return 0;
// }


// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>
// #include <stdbool.h>

// #define MAX_Name 256 
// #define Tabel_size 10
// // table = [1,2,3,4,5,6,7,8,9,10]


// typedef struct {
//    char name[MAX_Name];
//    int age;
// } person;


// unsigned int hash(char *name) {
//     return 5;
// }

// int main() {
//     unsigned int hash_value1 = hash("John");
//     unsigned int hash_value2 = hash("habdk");
//     unsigned int hash_value3 = hash("jrvrn");


//     printf("hash value1 = %u\n", hash_value1);
//     printf("hash value2 = %u\n", hash_value2);
//     printf("hash value3 = %u\n", hash_value3);

//     return 0;
// }


// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>

// #define TABLE_SIZE 10

// typedef struct {
//     char *key;
//     char *value;
//     struct hash_node *next;
// } hash_node;

// typedef struct  {
//     hash_node *buckets[TABLE_SIZE];
// } hash_table;

// unsigned int hash(char *key) {
//     return strlen(key) % TABLE_SIZE;  // Simple hash for demo
// }

// void insert(hash_table *ht, char *key, char *value) {
//     unsigned int index = hash(key);
    
//     hash_node *new_node = malloc(sizeof(struct hash_node));
//     new_node->key = strdup(key);
//     new_node->value = strdup(value);
//     new_node->next = NULL;

//     if (ht->buckets[index] == NULL) {
//         ht->buckets[index] = new_node;
//     } else {
//         // Add to end of chain
//         hash_node *current = ht->buckets[index];
//         while (current->next != NULL) {
//             current = current->next;
//         }
//         current->next = new_node;
//     }
// }

// char *lookup(hash_table *ht, char *key) {
//     unsigned int index = hash(key);
    
//     hash_node *current = ht->buckets[index];
//     while (current != NULL) {
//         if (strcmp(current->key, key) == 0) {  // Compare actual keys
//             return current->value;
//         }
//         current = current->next;
//     }
//     return NULL;
// }

// void print_bucket(struct hash_table *ht, int index) {
//     printf("Bucket[%d]: ", index);
//     struct hash_node *current = ht->buckets[index];
//     while (current != NULL) {
//         printf("[%s=%s] → ", current->key, current->value);
//         current = current->next;
//     }
//     printf("NULL\n");
// }

// int main() {
//     struct hash_table *ht = malloc(sizeof(struct hash_table));
//     for (int i = 0; i < TABLE_SIZE; i++) ht->buckets[i] = NULL;
    
//     // Insert SAME key "hassan" with different values
//     insert(ht, "hassan", "data1");
//     insert(ht, "hassan", "data2");  // Same key!
//     insert(ht, "hassan", "data3");  // Same key!
    
//     printf("Hash table state:\n");
//     print_bucket(ht, 5);  // "hassan" hashes to index 5
    
//     printf("\nLookup results:\n");
//     printf("lookup('hassan'): %s\n", lookup(ht, "hassan"));
    
//     return 0;
// }



// #include <stdio.h>
// #include <stdlib.h>
// #include <string.h>

// // Define the hash node struct (as you described)
// struct hash_node {
//     int key;                // Key for hashing (e.g., an ID or name hash)
//     void *value;            // Generic value (can be any type, e.g., string, int)
//     struct hash_node *next; // Pointer to next node in the chain for collisions
// };

// // Define the hash table
// #define TABLE_SIZE 10  // Array size (keep small for example; larger reduces collisions)
// struct hash_table {
//     struct hash_node *buckets[TABLE_SIZE];  // Array of pointers to hash_node (each is a chain head)
// };

// // Simple hash function: Maps key to an index in the array
// unsigned int hash(int key) {
//     return key % TABLE_SIZE;  // Modulo for index (good for integers; for strings, sum chars % size)
// }

// // Initialize the hash table (set all buckets to NULL)
// struct hash_table *create_hash_table() {
//     struct hash_table *ht = malloc(sizeof(struct hash_table));
//     if (ht == NULL) {
//         printf("Memory allocation failed!\n");
//         exit(1);
//     }
//     for (int i = 0; i < TABLE_SIZE; i++) {
//         ht->buckets[i] = NULL;  // Each bucket starts empty (no chain)
//     }
//     return ht;
// }

// // Insert a key-value pair (handles collisions with chaining)
// void insert(struct hash_table *ht, int key, void *value) {
//     unsigned int index = hash(key);  // Compute hash index

//     // Create new node
//     struct hash_node *new_node = malloc(sizeof(struct hash_node));
//     if (new_node == NULL) {
//         printf("Memory allocation failed!\n");
//         return;
//     }
//     new_node->key = key;
//     new_node->value = value;
//     new_node->next = NULL;

//     // If bucket is empty, set as head
//     if (ht->buckets[index] == NULL) {
//         ht->buckets[index] = new_node;
//     } else {
//         // Collision: Chain to the end of the list
//         struct hash_node *current = ht->buckets[index];
//         while (current->next != NULL) {
//             current = current->next;  // Traverse to end
//         }
//         current->next = new_node;  // Add new node to chain
//     }
// }

// // Lookup a value by key (returns value or NULL if not found)
// void *lookup(struct hash_table *ht, int key) {
//     unsigned int index = hash(key);  // Compute hash index

//     // Traverse the chain at this index
//     struct hash_node *current = ht->buckets[index];
//     while (current != NULL) {
//         if (current->key == key) {
//             return current->value;  // Found! Return value
//         }
//         current = current->next;  // Move to next in chain
//     }
//     return NULL;  // Not found
// }

// // Delete a key (frees node, updates chain)
// void delete_key(struct hash_table *ht, int key) {
//     unsigned int index = hash(key);
//     struct hash_node *current = ht->buckets[index];
//     struct hash_node *prev = NULL;

//     while (current != NULL) {
//         if (current->key == key) {
//             if (prev == NULL) {
//                 // Head of chain: Update bucket
//                 ht->buckets[index] = current->next;
//             } else {
//                 // Middle/end: Link prev to next
//                 prev->next = current->next;
//             }
//             free(current);  // Free the node
//             return;
//         }
//         prev = current;
//         current = current->next;
//     }
// }

// // Free the entire hash table (cleanup)
// void free_hash_table(struct hash_table *ht) {
//     for (int i = 0; i < TABLE_SIZE; i++) {
//         struct hash_node *current = ht->buckets[i];
//         while (current != NULL) {
//             struct hash_node *temp = current;
//             current = current->next;
//             free(temp);  // Free each node in chain
//         }
//     }
//     free(ht);
// }

// // Main function to demonstrate
// int main() {
//     struct hash_table *ht = create_hash_table();

//     // Insert examples (with collisions)
//     insert(ht, 1, strdup("Data for key 1"));  // Index 1
//     insert(ht, 11, strdup("Data for key 11")); // Collision: 11%10=1, chains to previous
//     insert(ht, 2, strdup("Data for key 2"));  // Index 2
//     insert(ht, 12, strdup("Data for key 12")); // Collision: 12%10=2

//     // Lookup examples
//     char *val1 = (char *)lookup(ht, 11);  // Cast back from void*
//     if (val1) printf("Lookup key 11: %s\n", val1);  // Outputs: Data for key 11

//     char *val2 = (char *)lookup(ht, 2);  
//     if (val2) printf("Lookup key 2: %s\n", val2);  // Outputs: Data for key 2

//     // Delete example
//     delete_key(ht, 11);
//     char *deleted = (char *)lookup(ht, 11);  
//     if (deleted == NULL) printf("Key 11 deleted successfully.\n");

//     // Cleanup
//     free_hash_table(ht);
//     return 0;
// }


