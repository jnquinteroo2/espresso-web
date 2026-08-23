export type Metodo = "espresso" | "filtrado" | "prensa" | "coldbrew";
export type Perfil = "tradicional" | "moderno";
export type EstadoProducto = "disponible" | "limitada" | "preventa" | "agotado";

export type Origen = {
  pais: string;
  region: string;
  finca: string;
  productor: string;
  altura: number; 
  variedad: string;
  proceso: string;
};

export type Preparacion = {
  metodo: string;
  ratio: string;
  molienda: string;
  temperatura: string;
  tiempo: string;
};

export type Presentacion = {
  gramos: number;
  precio: number; 
};

export type Cafe = {
  slug: string;
  codigo: string;
  nombre: string;
  notas: string[];
  perfil: Perfil;
  tueste: 1 | 2 | 3 | 4 | 5;
  tuesteNombre: string;
  origen: Origen;
  puntajeSCA: number;
  metodos: Metodo[];
  descafeinado: boolean;
  presentaciones: Presentacion[];
  moliendas: string[];
  fechaTueste: string;
  estado: EstadoProducto;

  colorBloque: "#000000" | "#072230" | "#0A302B";
  imagen: string;
  preparacion: Preparacion[];
};

export type CategoriaMethodsShop = "molinos" | "drips" | "accesorios" | "merch" | "tazas" | "bolsas";

export type MethodsShopItem = {
  slug: string;
  nombre: string;
  marca: string;
  categoria: CategoriaMethodsShop;
  precio: number;
  imagen: string;
  descripcion: string;
  stock: boolean;
};

export type AreaClase = "barismo" | "latte-art" | "sensorial" | "filtrado";

export type Clase = {
  slug: string;
  fecha: string;
  dia: string; 
  mes: string;
  titulo: string;
  descripcion: string;
  area: AreaClase;
  invitadoEspecial: boolean;
  cupos: number;
  precio: number;
};

export type TipoMarca = "maquinas" | "molinos" | "metodos" | "insumos";

export type Marca = {
  nombre: string;
  logo: string;
  tipo: TipoMarca;
  porQue: string;
};

export type CartaVinylItem = {
  nombre: string;
  icono: "copa-martini" | "tiki" | "copa-spritz" | "copa-vino" | "pera" | "queso";
};

export type EventoVinyl = {
  slug: string;
  fecha: string;
  titulo: string;
  genero: string;
  horario: string;
  cupos: number;
  extras: string[];
  edicion: string;
  carta: CartaVinylItem[];
};

export type CartaSeccion = "espresso" | "metodos" | "frios" | "con-leche" | "pasteleria";

export type CartaItem = {
  nombre: string;
  seccion: CartaSeccion;
  precio: number;
  descripcion?: string;
};
