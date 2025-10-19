#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct Node {
   int data;
   struct Node* next; 
};

int main() {
    struct Node* head = malloc(sizeof(struct Node));
    head->data =10;
    head->next = NULL;

    printf("Node data: %d\n", head->data);
    free(head);













    // char myString[10] = "hssina l";
    // printf("%s, length: %zu\n", myString, strlen(myString));
    return 0;
}
