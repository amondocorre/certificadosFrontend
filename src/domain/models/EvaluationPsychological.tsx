export interface EvaluationPsychological{
  file?:                              File
  //A) DATOS PERSONALES
  id_evaluacion_psicologica?:         string;
  ap_paterno:                         string;
  ap_materno:                         string;
  nombre:                             string;
  edad:                                 string;
  ci:                                 string;
  lugar_nacimiento:                   string;
  fecha_nacimiento:                   string;
  profecion:                          string;
  fecha_examen:                       string;
  domicilio:                          string;
  numero_domicilio:                   string;
  zona:                               string;
  telefono:                           string;
  // B) HISTORIA FAMILIAR
  historia_familiar:                  string;
  // E) EXAMEN PSICOLOGICO
  coordinacion_visomotora:            string;
  personalidad:                       string;
  atencion_cognitiva:                 string;
  reaccion_estres_riego:              string;   
  //resultado_recomendacion:            string;
  // OBSERVACIONES 
  observacion:                        string;
}