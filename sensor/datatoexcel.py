import pandas as pd
import os

# Initialize lists to store values for each column
humidity = []
temperature = []
soil_moisture = []
nitrogen = []
phosphorous = []
potassium = []

# Path to your input and output files
input_file_path = r"D:\ecs\sensor\data.txt"
output_file_path = r"D:\ecs\sensor\output.xlsx"

# Check if the output file is writable
if os.path.exists(output_file_path):
    try:
        os.rename(output_file_path, output_file_path)  # Attempt to rename the file to check write access
    except OSError:
        print(f"Error: The file '{output_file_path}' is not writable. Please close it if it is open and try again.")
        exit()

# Read the text file and extract values without units
with open(input_file_path, "r") as file:
    for line in file:
        if "Humidity" in line:
            humidity.append(line.split(": ")[1].strip().replace("%", ""))
        elif "Temperature" in line:
            temperature.append(line.split(": ")[1].strip().replace("C", ""))
        elif "Soil Moisture" in line:
            soil_moisture.append(line.split(": ")[1].strip().replace("%", ""))
        elif "Nitrogen" in line:
            nitrogen.append(line.split(": ")[1].strip().replace(" mg/kg", ""))
        elif "Phosphorous" in line:
            phosphorous.append(line.split(": ")[1].strip().replace(" mg/kg", ""))
        elif "Potassium" in line:
            potassium.append(line.split(": ")[1].strip().replace(" mg/kg", ""))

# Create a DataFrame
data = {
    "Humidity": humidity,
    "Temperature": temperature,
    "Soil Moisture": soil_moisture,
    "Nitrogen": nitrogen,
    "Phosphorous": phosphorous,
    "Potassium": potassium
}
df = pd.DataFrame(data)

# Calculate the averages for each column
averages = df.apply(pd.to_numeric, errors='coerce').mean()

# Print the averages
print("Averages of each column:")
print(averages)

# Export to Excel
df.to_excel(output_file_path, index=False)

# Confirm success
print(f"Data successfully written to '{output_file_path}'.")
