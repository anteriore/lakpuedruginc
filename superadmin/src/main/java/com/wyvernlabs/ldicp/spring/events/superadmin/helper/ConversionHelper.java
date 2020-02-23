package com.wyvernlabs.ldicp.spring.events.superadmin.helper;

public class ConversionHelper {


    public static double convert(String unit1, String unit2, int... values) {
        if (unit1.equals("kg") && unit2.equals("ml")) {
            return kgToML(values[0], values[1]);
        } else if (unit1.equals("gm") && unit2.equals("ml")) {
            return gmToML(values[0], values[1]);
        } else if (unit1.equals("ml") && unit2.equals("kg")) {
            return mlToKg(values[0], values[1]);
        } else if (unit1.equals("ml") && unit2.equals("g")) {
            return mlToG(values[0], values[1]);
        } else if (unit1.equals("g") && unit2.equals("ltr")) {
            return gToLtr(values[0], values[1]);
        } else if (unit1.equals("ltr") && unit2.equals("g")) {
            return ltrToG(values[0], values[1]);
        } else if (unit1.equals("ml") && unit2.equals("mg")) {
            return mlToMG(values[0], values[1]);
        }

        return -1;
    }

    /**
     * Convert KG - ML
     * @param unitInKg
     * @param specificGravity
     * @return
     */
    public static double kgToML(int unitInKg, int specificGravity) {
        return (unitInKg / specificGravity) * 1000;
    }

    /**
     * Convert GM - ML
     * @param quantity
     * @param specificGravity
     * @return
     */
    public static double gmToML(int quantity, int specificGravity) {
        return ((quantity / 1000) / specificGravity) * 1000;
    }

    /**
     * Convert ML - KG
     * @param ml
     * @param specificGravity
     * @return
     */
    public static double mlToKg(int ml, int specificGravity) {
        return ((ml / 1000) * specificGravity);
    }

    /**
     * Convert ML - G
     * @param quantity
     * @param specificGravity
     * @return
     */
    public static double mlToG(int quantity, int specificGravity) {
        return ((quantity / 1000) * specificGravity) * 1000;
    }


    /**
     * Convert G - LTR
     * @param quantity
     * @param specificGravity
     * @return
     */
    public static double gToLtr(int quantity, int specificGravity) {
        return ((quantity / 1000) / specificGravity);
    }

    /**
     * Convert LTR to G
     * @param quantity
     * @param specificGravity
     * @return
     */
    public static double ltrToG(int quantity, int specificGravity) {
        return ((quantity * specificGravity) * 1000);
    }

    /**
     * Convert ML - MG
     * @param quantity
     * @param specificGravity
     * @return
     */
    public static double mlToMG(int quantity, int specificGravity) {
        return ((quantity * specificGravity) * 1000);
    }



}
