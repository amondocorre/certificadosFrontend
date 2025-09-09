export interface EvaluationMedical{
  file?:                                File
  //Client Data
  id_evaluacion_medica?:                string;
  foto:                                 string ;
  ap_paterno:                           string;
  ap_materno:                           string;
  nombre:                               string;
  ci:                                   string;
  edad:                                 number;
  sexo:                                 string
  fecha:                                string
  //I. ANTECENDENTES
  antecendentes_rc:                     string;
  antecendentes_pp:                     string;
  bebe:                                 string;
  fuma:                                 string;
  f_amarilla:                           string;
  antitetanica:                         string;
  //II. EXAMEN CLINICO
  grupo_sanguineo:                      string;
  temperatura:                          string;
  presion_arterial:                     string;
  frecuencia_cardiaca:                  string;
  frecuencia_respiratoria:              string;
  talla:                                string;
  peso:                                 string;
  //III. EXAMEN FISICO
  // 1. EXPLORACION DE CABEZA, CARA Y CUELLO
  cabeza:                               string;
  cara:                                 string;
  cuello:                               string;
  // EVALUACION OCTAMOOGICA
  ex_general_ojos:                      string;
  movimiento_oculares:                  string;
  reflejo_luminoso_corneal:             string;
  estrabismo:                           string;
  usa_lentes:                           string;
  cirugia:                              string;
  tipo_lentes:                          string;
  campimetria:                          string;
  colorimetria:                         string;
  od_con_lentes:                        string;
  od_sin_lentes:                        string;
  od_correccion:                        string;
  oi_con_lentes:                        string;
  oi_sin_lentes:                        string;
  oi_correccion:                        string;
  vision_profunda:                      string;
  dx_lampara_hendidura:                 string;
  // APARATO AUDITIVO
  oido_externo:                         string;
  oroscopia:                            string;
  t_weber:                              string;
  t_rinne:                              string;
  //2. EXPLORACION DEL APARATO CARDIO CIRCULATORIO Y RESPIRATORIO
  torax:                                string;
  cardiopolmunar:                       string;
  //3. EXPLORACION DEL APARATO DIGESTIVO
  abdomen:                              string;
  //4. EXPLORACION DEL APARATO LOCONMOTOR
  s_trofismo:                           string;
  s_tono_moscular:                      string;
  s_fuerza_moscular:                    string;
  i_trofismo:                           string;
  i_tono_moscular:                      string;
  i_fuerza_moscular:                    string;
  //5. SISTEMA NEUROLOGICO
  cordinacion_marcha:                   string;
  reflejos_osteotendinosos:             string;
  // PRUEBAS DE CORDINACION
  talon_rodilla:                        string;
  dedo_nariz:                           string;
  // PRUEBAS DE EQUILIBRIO
  romberg:                              string;
  motoras_sensetivas_diagnosticadas:    string;
  // RESULTADO DE EVALUACIÓN
  requiere_evaluacion_especialidad:     string;
  motivo_referencia_especialidad:       string;
  evaluacion_especialidad:              string;
  requiere_evaluacion_psicosensometria: string;
  // RESULTADO FINAL DE CETIFICACION ME        
  resultado_evaluacion:                 string;
  motivo_resultado:                     string;
}