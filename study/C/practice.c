#include <pthread.h>
#include <stdio.h>

void* work(void* arg) {
    while (1) {}   // burn CPU
    return NULL;
}

int main() {
    pthread_t th[4];

    for (int i = 0; i < 4; i++)
        pthread_create(&th[i], NULL, work, NULL);

    for (int i = 0; i < 4; i++)
        pthread_join(th[i], NULL);
}



// #include <stdio.h>
// #include <stdlib.h>
// #include <pthread.h>

// typedef struct {
//     int start;
//     int end;
//     int sum;
// } ThreadData;

// void* sum_range(void* arg) {
//     ThreadData* data = (ThreadData*) arg;
//     int s = 0;
//     for(int i = data->start; i <= data->end; i++) s += i;
//     data->sum = s;  // store result safely in heap
//     return NULL;
// }

// int main() {
//     pthread_t tid;
//     ThreadData* td = malloc(sizeof(ThreadData));  // heap allocation
//     td->start = 1;
//     td->end = 10;

//     pthread_create(&tid, NULL, sum_range, td);
//     pthread_join(tid, NULL);

//     printf("Sum = %d\n", td->sum);
//     free(td);  // free heap memory
// }



// #include <stdio.h>
// #include <stdlib.h>
// #include<string.h>

// typedef struct Students {
//     int age;
//     int *data;
// } Student;

//   void play(Student *student1) {
//     student1 = malloc(sizeof(Student));
//     printf("memory address of student1: %p\n", student1);

//     Student **student2 = &student1;
//     printf("%p\n", student2);
//     student2 = malloc(sizeof(Student*));
//     printf("memory address after allocation :%p\n", student2 );

//     free(student2);
//     free(student1);
// }

// int main(int argc, char *argv[]) {
    // Student student_sample = {.age = 23, .data = NULL };
    // play(&student_sample);

    // printf("Original student age: %d\n", student_sample.age);

    // char* words[] = {"hello", "world", "code"};
    // char** ptr = words;
    // for (ptr = words; ptr < words + 3; ptr++ )
    // {
    //     printf("%p\n", ptr);
    //     printf("%s\n", *ptr);
    // }

    // Step 1: define strings
    // char *s1 = "coca";
    // char *s2 = "fanta";
    // char *s3 = "orange";

    // // Step 2: define array of pointers to pointers
    // char **arr[] = { &s1, &s2, &s3 };  // each element is char**

    // // Step 3: iterate
    // char ***ptr;
    // for (ptr = arr; ptr < arr + sizeof(arr)/sizeof(arr[0]); ptr++) {
    //     printf("%p -> %s\n", (void*)*ptr, **ptr);  // print address and string
    // }









    // for (int i=0; i < 3; i++) {
    //     printf("%s\n", words[i]);
    // }

    // puts("\n=== Pointer loop (char **p) ===");
    // for (char* p = &words; p < words + 3; p++) {
    //     printf("%s\n", *p);  // *p dereferences to the real string (array of char)
    // }

    // int value = 42;
    // int* ptr = &value;           // ptr points to value
    // int** dbl_ptr = &ptr;        // dbl_ptr points to ptr

    // // Accessing:
    // printf("%d\n", **dbl_ptr); 

// }