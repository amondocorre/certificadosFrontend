export interface EvaluationPsychological{
  file?:                              File
  //A) DATOS PERSONALES
  id_evaluacion_psicologica?:         string;
  ap_paterno:                         string;
  ap_materno:                         string;
  nombre:                             string;
  ci:                                 string;
  lugar_nacimiento:                   string;
  fecha_nacimiento:                   string;
  ocupacion:                          string;
  domicilio:                          string;
  numero_domicilio:                   string;
  zona:                               string;
  telefono:                           string;
  // B) HISTORIA MEDICA
  historia_medica:                    string;
  // C) HISTORIA FAMILIAR
  historia_familiar:                  string;
  // D) EXAMEN O EVALUACION PSICOLOGICA DE MADUREZ
  // 1. ESCALAS DE APRECIACION DEL ESTRES - EAE
  niveles_estres:                     string;
  estrategias_afrontamiento:          string;
  vulnerabilidad_emocional:           string;
  //2. BATERIA DE CONDUCTORES - BC 
  atencion_sostenida_selectiva:       string;
  capacidad_reaccion:                 string;
  control_impulso:                    string;
  actidud_norma_autoridad:            string;
  estabilidad_emocional:              string;
  //E) RESULTADOS Y RECOMENDACIONES 
  resultado_recomendacion:            string;
  //F) OBSERVACIONES 
  observacion:                        string;
}