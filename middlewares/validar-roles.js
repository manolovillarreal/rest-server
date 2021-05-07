const { response, request } = require("express")


const esAdminRole = (req = request, res = response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se esta valiando el role sin validar el jwt'
        })
    }

    const {rol,nombre}= req.usuario ;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:  `${nombre}  no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = (...roles)=>{

   return (req, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:'Se esta valiando el role sin validar el jwt'
        });
    }
        console.log(roles)
    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg:  `Rol de usuario no autorizado`
        });
    }

    next();
   }
}


module.exports={
    esAdminRole,
    tieneRole
}



