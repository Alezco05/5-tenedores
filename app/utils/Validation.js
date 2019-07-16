import t from 'tcomb-form-native';

export default (formValidation = {
    email: t.refinement(t.String,(value) => {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);
    }),
    password: t.refinement(t.String,(value)=>{
        return value.length >= 6; 
    })
});
