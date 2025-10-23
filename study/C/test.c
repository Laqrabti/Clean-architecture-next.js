// #include <stdio.h>
// #include <string.h>
// #include <stdlib.h>

// typedef struct Node {
//    int data;
//    struct Node* next; 
// }Node;

// Node* insert(char data[], Node* nd) {
//     nd->data = data;
//     return nd;
// }

// int main() {
//     Node* nd = malloc(sizeof(Node));
//     Node* result = insert("ahmed", &nd);
//     printf("result is %p\n", result);
//     free(nd);

//     return 0;
//     // struct Node* head = malloc(sizeof(struct Node));
//     // head->data =10;
//     // head->next = NULL;

//     // printf("Node data: %d\n", head->data);
//     // free(head);

//     // char myString[10] = "hssina l";
//     // printf("%s, length: %zu\n", myString, strlen(myString));
// }

// #include <stdio.h>


// typedef struct Parent {
//    int id;
//    char name[];
// } P;



// int main() {
    
    
//     // char* arr[3] = {"hello", "world", "test"};  // array of 3 pointers
    
//     // printf("Array of pointers to strings:\n");
//     // for(int i = 0; i < 3; i++) {
//     //     printf("arr[%d] = %p -> '%s'\n", i, (void*)arr[i], arr[i]);
//     // }
    
//     // printf("\nAddresses of the pointers themselves:\n");
//     // for(int i = 0; i < 3; i++) {
//     //     printf("&arr[%d] = %p\n", i, (void*)&arr[i]);
//     // }

//     // char* arr[3] = {"hello", "world", "test"};
//     // printf("%s\n", *arr);
//     // printf("%p\n", arr);

//     // Array version - mutable
//     char arr1[] = "hello";
//     arr1[0] = 'H';  // This is OK - modifies stack memory
//     printf("Array version: %s\n", arr1);  // Output: "Hello"
    
//     // Pointer version - immutable
//     char *arr2 = "hello";
//     arr2[0] = 'H';  // This causes UNDEFINED BEHAVIOR - may crash!
//     printf("Pointer version: %s\n", arr2);
    
//     return 0;
// }


#include <stdio.h>
#include <stdlib.h>
#include<string.h>

struct BadStruct {
    int id;  // Flexible array NOT last
    int age;  
    char name[];    // This will be OVERWRITTEN
};

int main() {
    // Allocate space for struct + 10 chars for name
    struct BadStruct *p = malloc(sizeof(struct BadStruct) + 10);
    
    p->id = 1;
    p->age = 25;  // Set age to 25
    
    // Now use the name array
    strcpy(p->name, "Hello");
    // p->name uses bytes where p->age should be!
    
    printf("Age after setting name: %d\n", p->age); 
    // Output: GARBAGE VALUE (not 25) - AGE WAS OVERWRITTEN!
    
    return 0;
}