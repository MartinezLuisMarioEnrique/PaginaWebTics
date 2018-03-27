create schema eco_lets;
set search_path to eco_lets;

create table cliente
(
	idcliente int primary key,
	nombre varchar(60),
	calle varchar(50),
	numero varchar(5),
	colonia varchar(50),
	codigoPostal varchar(10),
	entidad varchar(20),
	correo varchar(25),
	telefono varchar(12)
);

create table administrador
(
	idadministrador int primary key,
	usuario varchar(30),
	contraseña varchar(30)
);

create table proveedor
(
	idproveedor int primary key,
	nombre varchar(30),
	numeroContacto varchar(15)
);

create table paqueteria
(
	idpaqueteria int primary key,
	nombre varchar(30),
	telefono varchar(15)
);

create table pedido
(
	idpedido int primary key,
	fechasolicitud varchar(30),
	preciototal varchar(15)
);

create table producto
(
	idproducto int primary key,
	nombre varchar(30),
	caracteristicas varchar(150),
	existencias int
);

create table compra
(
	folio_compra int primary key,
	totalcompra varchar(10),
	fechacompra varchar(15),
	fechaentrega varchar(15)
);

create table materiaPrima
(
	idmateriaPrima int primary key,
	precio varchar(10),
	descripcion varchar(50)
);

create table detallePedido
(
	pedido int,
	cliente int,
	producto int,
	paqueteria int,
	cantidad int,
	precio varchar(10),
	depositoACuenta varchar(20),
	transElectronica varchar(20),
	pagoReferenciado varchar(20),
	tarjetaCreditoDebito varchar(20),
	foreign key (pedido) references pedido (idpedido),
	foreign key (cliente) references cliente (idcliente),
	foreign key (producto) references producto (idproducto),
	foreign key (paqueteria) references paqueteria (idpaqueteria)
);

create table detalleCompra
(
	compra int,	
	administrador int,
	proveedor int,
	materiaPrima int,
	precioXCantidad varchar(10),
	cantidad int,
	foreign key (compra) references compra (folio_compra),
	foreign key (administrador) references administrador (idadministrador),
	foreign key (proveedor) references proveedor (idproveedor),
	foreign key (materiaPrima) references materiaPrima (idmateriaPrima)
);

create table detallePaqueteria
(
	paqueteria2 int,
	pedido2 int,
	claveSeguimiento varchar(10),
	estatusEntrega varchar(20),
	foreign key (paqueteria2) references paqueteria (idpaqueteria),
	foreign key (pedido2) references pedido (idpedido)
);