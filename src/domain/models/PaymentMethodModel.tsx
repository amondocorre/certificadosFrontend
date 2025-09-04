export interface PaymentMethod {
  id_forma_pago?: number;
  nombre: string;
  descripcion?: string;
  estado?: string;
}
export interface PaymentMethodResponse{
  status:string;
  message?:string;
  data:PaymentMethod[] |[]|PaymentMethod;
} 
