import Swal from "sweetalert2"
import './styles.css'
export const AlertSave = ({ title = "", message = "Se ha Registrado Correctamente!" }: any) => {
    return (
       Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      customClass: {
        container: 'customClassName',
         popup: 'customClassName'
      }
    })
    )
}

export const AlertQuestion = ({ title = "", message = "No se ha registrado!" }: any) => {
  return (
    Swal.fire({
      icon: 'question',
      title: title,
      text: message,
      customClass: {
        container: 'customClassName'
      }
    })
  )
}

export const AlertError = ({ title = "", message = "Algo salió mal",html=''}: any) => {
  return (
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      html:html,
      customClass: {
        container: 'customClassName'
      }
      //footer: '<a href="">Why do I have this issue?</a>'
    })
  )
}

interface AlertConfirmOptions {
  title?: string;
  confirmButtonText?: string;
  denyButtonText?: string;
  cancelButtonText?: string;
  
}

export const AlertConfirm = ({
  title = "¿Deseas guardar los cambios?",
  confirmButtonText = "Guardar",
  denyButtonText = "No guardar",
  cancelButtonText = "Cancelar.",
}: AlertConfirmOptions) => {
  return Swal.fire({
    title: title,
    //showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    //denyButtonText: denyButtonText,
    cancelButtonText:cancelButtonText,
    customClass: {
      container: 'customClassName'
    }
  }).then((result) => {
    return result;
  });
};
