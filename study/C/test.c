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


// #include <stdio.h>
// #include <stdlib.h>
// #include<string.h>

// typedef struct BadStruct {
//     int id;  // Flexible array NOT last
//     int age;  
//     char name[];    // This will be OVERWRITTEN
// } Bad2;

// int main() {

//     // Allocate space for struct + 10 chars for name
//     struct BadStruct *p = malloc(sizeof(Bad2) + 10);
    
//     p->id = 1;
//     p->age = 25;  // Set age to 25
    
//     // Now use the name array
//     strcpy(p->name, "Hello");
//     // p->name uses bytes where p->age should be!
    
//     printf("Age after setting name: %d\n", p->age); 
//     // Output: GARBAGE VALUE (not 25) - AGE WAS OVERWRITTEN!
//     printf("%zu char\n",sizeof(char));
//     printf("%zu int \n",sizeof(int));
//     printf("%zu float\n",sizeof(float));
//     printf("%zu double\n",sizeof(double));
    
//     return 0;
// }



// file: preorder_tree.c
#include <stdio.h>
#include <stdlib.h>

/* Basic binary tree node */
struct Node {
    int val;
    struct Node *left;
    struct Node *right;
};

/* Allocate a new node */
struct Node* new_node(int v) {
    struct Node* n = malloc(sizeof(struct Node));
    if (!n) {
        perror("malloc");
        exit(EXIT_FAILURE);
    }
    n->val = v;
    n->left = n->right = NULL;
    return n;
}

/* Count nodes in tree (used to size the stack for iterative traversal) */
int count_nodes(struct Node* root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

/* Recursive preorder: root, left, right */
void preorder_recursive(struct Node* root) {
    if (!root) return;
    printf("%d ", root->val);
    preorder_recursive(root->left);
    preorder_recursive(root->right);
}

/* Iterative preorder using an explicit stack.
   We size the stack to number of nodes to avoid overflow. */
void preorder_iterative(struct Node* root) {
    if (!root) return;

    int n = count_nodes(root);
    struct Node** stack = malloc(sizeof(struct Node*) * n);
    if (!stack) {
        perror("malloc");
        exit(EXIT_FAILURE);
    }

    int top = -1;
    stack[++top] = root;

    while (top >= 0) {
        struct Node* node = stack[top--];
        printf("%d ", node->val);

        /* push right first so left is processed next (LIFO) */
        if (node->right) stack[++top] = node->right;
        if (node->left)  stack[++top] = node->left;
    }

    free(stack);
}

/* Free all nodes (postorder deletion) */
void free_tree(struct Node* root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

/* Build the example tree:
         1
        / \
       2   3
      / \   \
     4   5   6
*/
struct Node* build_example_tree(void) {
    struct Node* root = new_node(1);
    root->left  = new_node(2);
    root->right = new_node(3);

    root->left->left  = new_node(4);
    root->left->right = new_node(5);

    root->right->right = new_node(6);

    return root;
}

int main(void) {
    struct Node* root = build_example_tree();

    printf("Preorder (recursive): ");
    preorder_recursive(root);
    printf("\n");

    printf("Preorder (iterative): ");
    preorder_iterative(root);
    printf("\n");

    free_tree(root);
    return 0;
}
