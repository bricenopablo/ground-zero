INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$260000$N6UdOtvIVDNLiHzbotkKaW$x/6vDG9oihKTW7AyuY8qivDXxoNt+IGj3CmK8UGPHIk=', NULL, 1, 'superuser', '', '', 'superuser@groundzero.cl', 1, 1, '2021-07-09 23:22:23.877693');

INSERT INTO `adminapp_administrador` (`idAdmin`, `email`, `nombreUsuario`, `contrasena`) VALUES
(1, 'adminuser@groundzero.cl', 'test', 'test1234');

INSERT INTO `core_arte` (`idArte`, `nombreArte`, `descripcionArte`, `destacado`, `precio`, `idArtista_id`, `fechaSubida`, `idCategoria_id`) VALUES
(1, 'Mis murales', 'Test', 1, 1200, 1, '2021-07-09', 2),
(2, 'Mis estatuas', 'test', 1, 120000, 1, '2021-07-09', 1);

INSERT INTO `core_artista` (`idArtista`, `pNombre`, `sNombre`, `apPaterno`, `apMaterno`, `email`, `clave`) VALUES
(1, 'Juan Pablo', 'Javier', 'Navarrete', 'Bernal', 'j.navarrete@duocuc.cl', 'test1234');

INSERT INTO `core_categoria` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Esculpido'),
(2, 'Muralismo'),
(3, 'Orfebreria'),
(4, 'Tejido');

INSERT INTO `core_imagen` (`idImagen`, `idArte_id`, `imagen`) VALUES
(1, 1, 'artes/oso-colores.jpg'),
(2, 1, 'artes/elefantes.jpg'),
(3, 1, 'artes/aborigen.jpg'),
(4, 2, 'artes/estatua-1_JLtVYc2.jpg'),
(5, 2, 'artes/hombre-acostado_5IjtKZ2.jpg'),
(6, 2, 'artes/mujer-acostada_rFLxSgz.jpg'),
(7, 2, 'artes/mujer-riendo_l1nwopB.jpg');