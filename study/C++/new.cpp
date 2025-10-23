#include <iostream>
using namespace std;

class Rectangle {
private:
    int width, height;
public:
    void set_values(int w, int h) { width = w; height = h; }
    int area() { return width * height; } // Method inside class
};

int main() {
    Rectangle rect;
    rect.set_values(3, 4);
    cout << "Area: " << rect.area() << endl;
    // cout << "Area: " << rect.area() << endl; // Direct method call
    return 0;
}