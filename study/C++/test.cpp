#include<iostream>
#include<string>

class Employee {
public:
    std::string name;
    std::string company;
};

int main() {

    Employee emp1 = Employee();
    emp1.name = "hassan";
    printf("%s\n", emp1.name.c_str());


    return 0;
}











// #include <iostream>
// #include <vector>
// #include <stdexcept>

// // Image class encapsulating grayscale image data and operations
// class Image {
// private:
//     int width;
//     int height;
//     std::vector<unsigned char> pixels; // Dynamic array for pixel data

// public:
//     // Constructor
//     Image(int w, int h) : width(w), height(h), pixels(w * h, 0) {
//         if (w <= 0 || h <= 0) {
//             throw std::invalid_argument("Width and height must be positive");
//         }
//     }

//     // Method to brighten image by adding value to each pixel
//     void brighten(unsigned char value) {
//         for (auto& pixel : pixels) {
//             // Cap at 255 to avoid overflow
//             pixel = pixel + value > 255 ? 255 : pixel + value;
//         }
//     }

//     // Method to print a small portion of the image for demo
//     void print_portion() const {
//         std::cout << "Image (" << width << "x" << height << ") top-left 3x3 pixels:\n";
//         for (int i = 0; i < 3 && i < height; ++i) {
//             for (int j = 0; j < 3 && j < width; ++j) {
//                 std::cout << static_cast<unsigned>(pixels[i * width + j]) << " ";
//             }
//             std::cout << "\n";
//         }
//     }

//     // Getter for width (optional, for encapsulation)
//     int get_width() const { return width; }

//     // Getter for height (optional, for encapsulation)
//     int get_height() const { return height; }
// };

// int main() {
//     try {
//         // Create image on heap with RAII
//         Image img(1920, 1080); // Full HD, stack-allocated but manages heap internally

//         // Manipulate image
//         img.brighten(100); // Brighten by 100
//         img.print_portion(); // Show sample

//         // Simulate another operation
//         img.brighten(50); // Brighten more
//         img.print_portion();

//         // No explicit cleanup needed; std::vector and RAII handle it
//     } catch (const std::exception& e) {
//         std::cerr << "Error: " << e.what() << std::endl;
//         return 1;
//     }

//     return 0;
// }