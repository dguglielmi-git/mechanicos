export type WorkEstado =
  | "Ingresado"
  | "En Proceso"
  | "Listo para Retirar"
  | "Entregado";

export interface WorkFormData {
  matricula: string;
  km: string;
  costoTotalServicio: string;
  estado: WorkEstado | "";
}

export interface WorkServiceRow {
  id: string;
  descripcion: string;
}
