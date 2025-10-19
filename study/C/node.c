// #include <stdio.h>
// #include <stdlib.h>

// struct Node {
//     int data;
//     struct Node* next;
// };

// int main() {
//     // // Create first node
//     // struct Node* head = malloc(sizeof(struct Node));
//     // head->data = 10;
    
//     // // Create second node  
//     // struct Node* second = malloc(sizeof(struct Node));
//     // second->data = 20;
    
//     // // Create third node
//     // struct Node* third = malloc(sizeof(struct Node));
//     // third->data = 30;
    
//     // // LINK THEM TOGETHER:
//     // head->next = second;   // head points to second
//     // second->next = third;  // second points to third  
//     // third->next = NULL;    // third points to nothing (end)
    
//     // // Visual representation:
//     // // head → [10|→] → [20|→] → [30|NULL]
    
//     // // Traverse the list:
//     // struct Node* current = head;
//     // while (current != NULL) {
//     //     printf("%d → ", current->data);
//     //     current = current->next;  // Move to next node
//     // }
//     // printf("NULL\n");
    
//     // // Don't forget to free!
//     // free(head);
//     // free(second); 
//     // free(third);




    
//     return 0;
// }




// // Global struct definition
// struct Point {
//     int x;
//     int y;
// };

// // Function that creates stack-allocated struct
// void stackExample() {
//     printf("=== STACK ALLOCATION EXAMPLE ===\n");
    
//     // Stack allocation - dies when function ends
//     struct Point stackPoint = {5, 10};
//     printf("Inside function - Stack point: (%d, %d)\n", stackPoint.x, stackPoint.y);
//     printf("Memory address: %p\n", &stackPoint);
    
//     // This struct will be destroyed when function returns!
// } // stackPoint dies here!

// // Function that creates heap-allocated struct
// struct Point* heapExample() {
//     printf("\n=== HEAP ALLOCATION EXAMPLE ===\n");
    
//     // Heap allocation - lives until free() is called
//     struct Point* heapPoint = malloc(sizeof(struct Point));
//     heapPoint->x = 15;
//     heapPoint->y = 20;
    
//     printf("Inside function - Heap point: (%d, %d)\n", heapPoint->x, heapPoint->y);
//     printf("Memory address: %p\n", heapPoint);
    
//     return heapPoint;  // Can return pointer - memory persists!
// }

// // DANGEROUS: Returning pointer to stack memory
// struct Point* dangerousExample() {
//     struct Point localPoint = {25, 30};  // Stack allocation
    
//     printf("\n=== DANGEROUS EXAMPLE ===\n");
//     printf("Local point: (%d, %d)\n", localPoint.x, localPoint.y);
//     printf("Memory address: %p\n", &localPoint);
    
//     return &localPoint;  // BAD! Returning address of local variable
// } // localPoint dies here, but we returned its address!

// int main() {
//     // Example 1: Stack allocation (dies when function ends)
//     stackExample();
    
//     // Can't access stackPoint here - it's already destroyed!
//     // printf("%d", stackPoint.x);  // COMPILE ERROR!
    
//     // Example 2: Heap allocation (persists)
//     struct Point* persistedPoint = heapExample();
//     printf("After function - Persisted point: (%d, %d)\n", 
//            persistedPoint->x, persistedPoint->y);
    
//     // Example 3: Dangerous stack return
//     struct Point* dangerousPointer = dangerousExample();
//     printf("After function - Dangerous point: (%d, %d)\n", 
//            dangerousPointer->x, dangerousPointer->y);  // UNDEFINED BEHAVIOR!
    
//     // Clean up heap memory
//     free(persistedPoint);
    
//     return 0;
// }


#include <stdio.h>
#include <stdlib.h>

// Define Image struct for grayscale image
typedef struct {
    int width;
    int height;
    unsigned char *pixels; // Pointer to pixel data on heap
} Image;

// Function to allocate and initialize image on heap
Image* create_image(int width, int height) {
    Image* img = malloc(sizeof(Image));
    if (!img) {
        fprintf(stderr, "Failed to allocate Image struct\n");
        return NULL;
    }
    img->width = width;
    img->height = height;
    size_t size = width * height;
    img->pixels = malloc(size * sizeof(unsigned char));
    if (!img->pixels) {
        fprintf(stderr, "Failed to allocate pixel data\n");
        free(img);
        return NULL;
    }
    // Initialize pixels to 0 (black)
    for (size_t i = 0; i < size; i++) {
        img->pixels[i] = 0;
    }
    return img;
}

// Function to brighten image by adding value to each pixel
void brighten_image(Image *img, unsigned char value) {
    size_t size = img->width * img->height;
    for (size_t i = 0; i < size; i++) {
        // Cap at 255 to avoid overflow
        img->pixels[i] = img->pixels[i] + value > 255 ? 255 : img->pixels[i] + value;
    }
}

// Function to print a small portion of the image for demo
void print_image_portion(Image *img) {
    printf("Image (%dx%d) top-left 3x3 pixels:\n", img->width, img->height);
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%3u ", img->pixels[i * img->width + j]);
        }
        printf("\n");
    }
}

// Function to free image memory
void free_image(Image *img) {
    if (img) {
        free(img->pixels);
        free(img);
    }
}

int main() {
    // Stack-allocated variables for temporary use
    int width = 1920;  // Full HD
    int height = 1080;
    
    // Create image on heap
    Image *img = create_image(width, height);
    if (!img) {
        return 1; // Exit on failure
    }
    
    // Stack-allocated pointer to heap data
    Image *img_ptr = img;
    
    // Manipulate image with different functions
    brighten_image(img_ptr, 100); // Brighten by 100
    print_image_portion(img_ptr); // Show sample
    
    // Simulate another function using the same heap data
    brighten_image(img_ptr, 50); // Brighten more
    print_image_portion(img_ptr);
    
    // Clean up heap memory
    free_image(img_ptr);
    
    return 0;
}