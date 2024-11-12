import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

class CropRecommendation {
    private double inputHumidity;
    private double inputN;
    private double inputP;
    private double inputK;
    private double inputTemp;
    private double inputRainfall;

    
    public CropRecommendation(double humidity, double N, double P, double K, double temperature, double rainfall) {
        this.inputHumidity = humidity;
        this.inputN = N;
        this.inputP = P;
        this.inputK = K;
        this.inputTemp = temperature;
        this.inputRainfall = rainfall;
    }

    
    public String suggestCrop() {
        String csvFile = "C:\\Users\\saiko\\OneDrive\\Documents\\datasets\\crop_data.csv"; // File path included here
        String line = "";
        String cvsSplitBy = ",";
        double minDifference = Double.MAX_VALUE;
        String recommendedCrop = "";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            
            br.readLine();

            while ((line = br.readLine()) != null) {
                String[] cropData = line.split(cvsSplitBy);

                
                double N = Double.parseDouble(cropData[0]);
                double P = Double.parseDouble(cropData[1]);
                double K = Double.parseDouble(cropData[2]);
                double temperature = Double.parseDouble(cropData[3]);
                double humidity = Double.parseDouble(cropData[4]);
                double rainfall = Double.parseDouble(cropData[6]);
                String crop = cropData[7];

                
                double difference = Math.abs(inputN - N) + Math.abs(inputP - P) + Math.abs(inputK - K)
                        + Math.abs(inputTemp - temperature) + Math.abs(inputHumidity - humidity)
                        + Math.abs(inputRainfall - rainfall);

                
                if (difference < minDifference) {
                    minDifference = difference;
                    recommendedCrop = crop;
                }
            }
        } catch (IOException e) {
            System.out.println(" not possible");
        }

        return recommendedCrop;
    }
}

public class crop_re {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Enter humidity level: ");
        double inputHumidity = input.nextDouble();
        System.out.println("Enter Nitrogen (N) level: ");
        double inputN = input.nextDouble();
        System.out.println("Enter Phosphorus (P) level: ");
        double inputP = input.nextDouble();
        System.out.println("Enter Potassium (K) level: ");
        double inputK = input.nextDouble();
        System.out.println("Enter temperature: ");
        double inputTemp = input.nextDouble();
        System.out.println("Enter rainfall: ");
        double inputRainfall = input.nextDouble();

        
        CropRecommendation cropRec = new CropRecommendation(inputHumidity, inputN, inputP, inputK, inputTemp,
                inputRainfall);

        
        System.out.println("The recommended crop is: " + cropRec.suggestCrop());
    }
}
