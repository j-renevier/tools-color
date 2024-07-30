export class ErrorMessage {
  // TYPE
  public static hueValidate = 'HUE VALIDATE'
  public static hueValidateInvalidType = 'HUE VALIDATE INVALID TYPE'

  // GETTER
  public static colorGetRed = 'COLOR GET_RED'
  public static colorGetHue = 'COLOR GET_HUE'
  public static colorGetHexa = 'COLOR GET_HEXA'
  public static colorGetBlue = 'COLOR GET_BLUE'
  public static colorGetGreen = 'COLOR GET_GREEN'
  public static colorGetLight = 'COLOR GET_LIGHT'
  public static colorGetAlpha = 'COLOR GET_ALPHA'
  public static colorGetSaturation = 'COLOR GET_SATURATION'

  // SETTER
  public static colorSetRed = 'COLOR SET_RED'
  public static colorSetHue = 'COLOR SET_HUE'
  public static colorSetHexa = 'COLOR SET_HEXA'
  public static colorSetBlue = 'COLOR SET_BLUE'
  public static colorSetGreen = 'COLOR SET_GREEN'
  public static colorSetLight = 'COLOR SET_LIGHT'
  public static colorSetAlpha = 'COLOR SET_ALPHA'
  public static colorSetSaturation = 'COLOR SET_SATURATION'
  public static colorSetRedInvalidType = 'COLOR SET_RED INVALID TYPE'
  public static colorSetHueInvalidType = 'COLOR SET_HUE INVALID TYPE'
  public static colorSetHexaInvalidType = 'COLOR SET_HEXA INVALID TYPE'
  public static colorSetBlueInvalidType = 'COLOR SET_BLUE INVALID TYPE'
  public static colorSetGreenInvalidType = 'COLOR SET_GREEN INVALID TYPE'
  public static colorSetLightInvalidType = 'COLOR SET_LIGHT INVALID TYPE'
  public static colorSetAlphaInvalidType = 'COLOR SET_ALPHA INVALID TYPE'
  public static colorSetSaturationInvalidType = 'COLOR SET_SATURATION INVALID TYPE'

  public static rootNotSelect = 'SELECT ROOT CSS IN DOCUMENT'

  
  public static error (message: ErrorMessage, error?:unknown) {
    if (error instanceof Error) {
      console.error(`${message}: ${error.message}`);
      throw new Error(`${message}: ${error.message}`);
    } else {
      console.error(`${message}: ${error}`);
      throw new Error(`${message}: ${error}`);
    }
  }
}