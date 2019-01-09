const generateToken = (param) => {
    const token = jwt.sign(param,
        process.env.SECRET, { expiresIn: '7d' }
    );
   return token;
}
