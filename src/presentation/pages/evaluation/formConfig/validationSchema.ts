import * as yup from 'yup';
export const validationMedicalBasic = yup.object().shape({
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  edad: yup.number().typeError('La edad debe ser un número').min(18, 'Edad inválida').required('La edad es obligatoria'),
  sexo: yup.string().required('El sexo es obligatorio'),
  fecha_evaluacion: yup.string().required('La fecha es obligatoria'),
});

export const validationMedical = yup.object().shape({
  foto: yup.string().required('La foto es obligatoria'),
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  edad: yup.number().typeError('La edad debe ser un número').min(16, 'Edad inválida').required('La edad es obligatoria'),
  sexo: yup.string().required('El sexo es obligatorio'),
  fecha_evaluacion: yup.string().required('La fecha es obligatoria'),
  // I. ANTECEDENTES
  antecendentes_rc: yup.string().required('requerido'),
  antecendentes_pp: yup.string().required('requerido'),
  bebe: yup.string().required('requerido'),
  fuma: yup.string().required('requerido'),
  f_amarilla: yup.string().required('requerido'),
  antitetanica: yup.string().required('requerido'),
  // II. EXAMEN CLÍNICO
  grupo_sanguineo: yup.string().required('requerido'),
  temperatura: yup.string().required('requerido'),
  presion_arterial: yup.string().required('requerido'),
  frecuencia_cardiaca: yup.string().required('requerido'),
  frecuencia_respiratoria: yup.string().required('requerido'),
  talla: yup.string().required('requerido'),
  peso: yup.string().required('requerido'),
  // III. EXAMEN FÍSICO
  cabeza: yup.string().required('requerido'),
  cara: yup.string().required('requerido'),
  cuello: yup.string().required('requerido'),
  ex_general_ojos: yup.string().required('requerido'),
  movimiento_oculares: yup.string().required('requerido'),
  reflejo_luminoso_corneal: yup.string().required('requerido'),
  estrabismo: yup.string().required('requerido'),
  usa_lentes: yup.string().required('requerido'),
  cirugia: yup.string().required('requerido'),
  tipo_lentes: yup.string().required('requerido'),
  campimetria: yup.string().required('requerido'),
  colorimetria: yup.string().required('requerido'),
  /*od_con_lentes: yup.string().required('requerido'),
  od_sin_lentes: yup.string().required('requerido'),
  od_correccion: yup.string().required(),
  oi_con_lentes: yup.string().required('requerido'),
  oi_sin_lentes: yup.string().required('requerido'),
  oi_correccion: yup.string().required('requerido'),*/
  vision_profunda: yup.string().required('requerido'),
  dx_lampara_hendidura: yup.string().required('requerido'),
  oido_externo: yup.string().required('requerido'),
  oroscopia: yup.string().required('requerido'),
  t_weber: yup.string().required('requerido'),
  t_rinne: yup.string().required('requerido'),
  torax: yup.string().required('requerido'),
  cardiopolmunar: yup.string().required('requerido'),
  abdomen: yup.string().required('requerido'),
  s_trofismo: yup.string().required('requerido'),
  s_tono_muscular: yup.string().required('requerido'),
  s_fuerza_muscular: yup.string().required('requerido'),
  i_trofismo: yup.string().required('requerido'),
  i_tono_muscular: yup.string().required('requerido'),
  i_fuerza_muscular: yup.string().required('requerido'),

  cordinacion_marcha: yup.string().required('requerido'),
  reflejos_osteotendinosos: yup.string().required('requerido'),

  talon_rodilla: yup.string().required('requerido'),
  dedo_nariz: yup.string().required('requerido'),
  romberg: yup.string().required('requerido'),
  motoras_sensetivas_diagnosticadas: yup.string().required('requerido'),

  requiere_evaluacion_especialidad: yup.string().required('requerido'),
  //motivo_referencia_especialidad: yup.string().required('requerido'),
  //evaluacion_especialidad: yup.string().required('requerido'),
  //requiere_evaluacion_psicosensometria: yup.string().required('requerido'),

  resultado_evaluacion: yup.string().required('requerido'),
  //motivo_resultado: yup.string().required('requerido'),
});


export const validationPsychologicalBasic = yup.object().shape({
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  edad: yup.number().typeError('La edad debe ser un número').min(18, 'Edad inválida').required('La edad es obligatoria'),
  fecha_evaluacion: yup.string().required('La fecha es obligatoria'),
  lugar_nacimiento:yup.string().required('La lugar de nacimiento es obligatoria'),
  fecha_nacimiento: yup.string().required('La fecha es obligatoria'),
  profecion:yup.string().required('La profeción es obligatoria'),
  domicilio:yup.string().required('La Domicilio es obligatoria'),
  numero_domicilio:yup.string().required('La numero domicilio es obligatoria'),
  zona:yup.string().required('El zona es obligatoria'),
  telefono:yup.string().required('La telefono es obligatoria'),
});

export const validationPsychological = yup.object().shape({
  //foto: yup.string().required('La foto es obligatoria'),
  foto: yup.string().nullable().notRequired(),
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  edad: yup.number().typeError('La edad debe ser un número').min(18, 'Edad inválida').required('La edad es obligatoria'),
  fecha_evaluacion: yup.string().required('La fecha es obligatoria'),
  lugar_nacimiento:yup.string().required('La lugar de nacimiento es obligatoria'),
  fecha_nacimiento: yup.string().required('La fecha es obligatoria'),
  profecion:yup.string().required('La profeción es obligatoria'),
  domicilio:yup.string().required('La Domicilio es obligatoria'),
  numero_domicilio:yup.string().required('El numero domicilio es obligatoria'),
  zona:yup.string().required('La zona es obligatoria'),
  telefono:yup.string().required('La telefono es obligatoria'),

  historia_familiar:yup.string().required('requerido'),
  coordinacion_visomotora:yup.string().required('requerido'),
  personalidad:yup.string().required('requerido'),
  atencion_cognitiva: yup.string().required('requerido'),
  reaccion_estres_riego:yup.string().required('requerido'),
  //observacion:yup.string().required('requerido'),
});

// report evaluacion 
export const validationInfPsychologicalBasic = yup.object().shape({
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  lugar_nacimiento:yup.string().required('La lugar de nacimiento es obligatoria'),
  fecha_nacimiento:yup.string().required('La fecha es obligatoria'),
  profecion:yup.string().required('La profeción es obligatoria'),
  domicilio:yup.string().required('La Domicilio es obligatoria'),
  numero_domicilio:yup.string().required('El numero domicilio es obligatoria'),
  zona:yup.string().required('La zona es obligatoria'),
  telefono:yup.string().required('La telefono es obligatoria'),
})
export const validationInfPsychological = yup.object().shape({
  foto:yup.string().required('La foto es obligatoria'),
  //A) DATOS PERSONALES
  //id_inf_evaluacion_psicologica:yup.string().required(''),
  ap_paterno: yup.string().required('El apellido paterno es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  ap_materno: yup.string().required('El apellido materno es obligatorio').min(3, 'El apellido paterno no puede tener menos de 3 caracteres'),
  nombre: yup.string().required('El nombre es obligatorio'),
  ci: yup.string().required('El CI es obligatorio'),
  lugar_nacimiento:yup.string().required('La lugar de nacimiento es obligatoria'),
  fecha_nacimiento:yup.string().required('La fecha es obligatoria'),
  profecion:yup.string().required('La profeción es obligatoria'),
  domicilio:yup.string().required('La Domicilio es obligatoria'),
  numero_domicilio:yup.string().required('El numero domicilio es obligatoria'),
  zona:yup.string().required('La zona es obligatoria'),
  telefono:yup.string().required('La telefono es obligatoria'),
  // B) HISTORIA MEDICA
  historia_medica:yup.string().required('requerido'),
  // C) HISTORIA FAMILIAR
  historia_familiar:yup.string().required('requerido'),
  // D) EXAMEN O EVALUACION PSICOLOGICA DE MADUREZ
  // 1. ESCALAS DE APRECIACION DEL ESTRES - EAE
  niveles_estres:yup.string().required('requerido'),
  estrategias_afrontamiento:yup.string().required('requerido'),
  vulnerabilidad_emocional:yup.string().required('requerido'),
  //2. BATERIA DE CONDUCTORES - BC 
  atencion_sostenida_selectiva:yup.string().required('requerido'),
  capacidad_reaccion:yup.string().required('requerido'),
  control_impulso:yup.string().required('requerido'),
  actidud_norma_autoridad:yup.string().required('requerido'),
  estabilidad_emocional:yup.string().required('requerido'),
  //E) RESULTADOS Y RECOMENDACIONES 
  resultado_recomendacion:yup.string().required('requerido'),
  //F) OBSERVACIONES 
  observacion:yup.string().required('requerido'),
})