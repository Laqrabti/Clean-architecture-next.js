// #include <stdio.h>
// #include <stdlib.h>

// // Define a simple struct for a Point
// typedef struct {
//     int x;
//     int y;
// } Point;

// // Function to modify struct directly (pass by value)
// void modify_point_by_value(Point p, int new_x, int new_y) {
//     p.x = new_x; // Modifies the copy
//     p.y = new_y;
//     printf("Inside modify_point_by_value: x=%d, y=%d\n", p.x, p.y);
// }

// // Function to modify struct via pointer (pass by reference)
// void modify_point_by_pointer(Point *p, int new_x, int new_y) {
//     p->x = new_x; // Modifies the original
//     p->y = new_y;
//     printf("Inside modify_point_by_pointer: x=%d, y=%d\n", p->x, p->y);
// }

// // Function to print struct (pass by value, sees current state)
// void print_point(Point p) {
//     printf("In print_point: x=%d, y=%d\n", p.x, p.y);
// }

// int main() {
//     // Stack-allocated struct
//     Point point = {10, 20};
//     printf("Original Point before: x=%d, y=%d\n", point.x, point.y);
    
//     // Modify by value (copy, no effect on original)
//     modify_point_by_value(point, 30, 40);
//     printf("Point after modify_point_by_value: x=%d, y=%d\n", point.x, point.y);
    
//     // Pass to another function to see state
//     print_point(point); // Sees original values
    
//     // Modify by pointer (changes original)
//     modify_point_by_pointer(&point, 50, 60);
//     printf("Point after modify_point_by_pointer: x=%d, y=%d\n", point.x, point.y);
    
//     // Pass to another function to see updated state
//     print_point(point); // Sees updated values
    
//     return 0;
// }


#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main() {
    Point point = {10, 20};
    Point* point_ptr = &point;  // point_ptr stores memory address of 'point'
    
    printf("=== MEMORY ADDRESSES ===\n");
    printf("point_ptr value (memory address): %p\n", (void*)point_ptr);
    printf("&point (address of point): %p\n", (void*)&point);
    
    printf("\n=== DEREFERENCING ===\n");
    printf("Using -> operator: x=%d, y=%d\n", point_ptr->x, point_ptr->y);
    printf("Using * and . operator: x=%d, y=%d\n", (*point_ptr).x, (*point_ptr).y);
    
    printf("\n=== MODIFYING THROUGH POINTER ===\n");
    point_ptr->x = 100;  // Modify original through pointer
    printf("After point_ptr->x=100: point.x = %d\n", point.x);
    
    (*point_ptr).y = 200;  // Same thing using dereference
    printf("After (*point_ptr).y=200: point.y = %d\n", point.y);
    
    return 0;
}