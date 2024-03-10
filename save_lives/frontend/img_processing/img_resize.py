from PIL import Image
import os

def resize_image(image_path, size):
    # Open the image file
    img = Image.open(image_path)
    # Convert image to RGB
    img = img.convert('RGB')
    # Resize the image
    img = img.resize(size, Image.LANCZOS)
    # Generate new file name
    base_name, ext = os.path.splitext(os.path.basename(image_path))
    new_file_name = f"{base_name}.jpg"
    new_image_path = os.path.join(os.path.dirname(image_path), new_file_name)
    # Save the image
    img.save(new_image_path)
    # Return new image path
    return new_image_path

if __name__ == '__main__':
    directory = 'D:/A. Main/Developing Enviroment/Full-Stack Websites/Blood_Donation/Save_Lives/save_lives/frontend2/public/img/team'
    for filename in os.listdir(directory):
        if (filename.endswith(".png") or filename.endswith(".jpg")) and filename.rsplit('.', 1)[0].isdigit():
            new_image_path = resize_image(os.path.join(directory, filename), (240, 150))
            print(f'Resized image is saved as {new_image_path}')