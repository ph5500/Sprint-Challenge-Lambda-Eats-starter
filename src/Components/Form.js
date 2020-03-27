import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const Schema = yup.object().shape({
    name: yup.string().required('Must include a name!'),
    email: yup.string().email().required('Must include an email'),
    size: yup.string().required('What size pizza would you like??'),
    toppings: yup.string().required('How many toppings you like?'),
    instructions: yup.string().required('Any extra instructions for your order?')

});




// export default function Form(props) {

const Form = () => {
    // console.log(props);
    //set state up here
    const [button, setButton] = useState(true);

    const [formState, setFormState] = useState({
        name: '',
        size: '',
        topping: '',
        instructions: '',
    })

    //error state below
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        toppings: '',
        instructions: '',
    })

    //post state below
    const [post, setPost] = useState([])
    useEffect(() => {
        Schema.isValid(Schema).then(valid => {
            setButton(!valid);
        })
    }, [formState])

    //now we will create the function for submitting a form
    const formSubmission = event => {
        event.preventDefault();
        axios
            .post('https://reqres.in/api/orders', formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: '',
                    size: '',
                    toppings: '',
                    instructions: '',
                })
            }).catch(err => console.log('there is an error', err.response))
    };


    const validated = el => {
        yup
            .reach(Schema, el.target.name)
            .validate(el.target.name === 'toppings' ? el.target.checked : el.target.value)
            .then(valid => {
                setErrors({
                    ...errors, [el.target.name]: ''

                })
            })
            .catch(err => {
                setErrors({
                    ...errors, [el.target.name]: err.errors[0]
                })
            })
    }


    //input changes

    const inputChange = el => {
        el.persist();
        const newFormData = {
            ...formState,
            [el.target.name]:
                el.target.type === 'checkbox' ? el.target.checked : el.target.value
        }
        validated(el);
        setFormState(newFormData);
    }

    return (
        //enter form data below
        <form onSubmit={formSubmission}>
            <h2>Build Your Own Pizza</h2>

            <label htmlFor="name">
                Name
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={formState.name}
                    onChange={inputChange}>
                </input>
                {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
            </label>


            <label htmlFor="size">
                Choose a Size
                <select
                    id='size'
                    name='size'
                    // value={formState.name}
                    onChange={inputChange}>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='extraLarge'>Extra Large</option>
                </select>
                {errors.size.length > 0 ? (<p className="error">{errors.name}</p>) : null}
            </label>
            <br></br>
            <label htmlFor="toppings">
                Add Toppings
            <input
                    id='toppings'
                    type="checkbox"
                    name="toppings"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                {errors.toppings.length > 0 ? <p classNme="error">{errors.toppings}</p> : null}
            </label>
            <br></br>
            <label htmlFor="instructions">
                <textarea
                    id="instructions"
                    name="instructions"
                    value={formState.flavor}
                    onChange={inputChange} />
                {errors.instructions.length > 0 ? <p className='error'>{errors.instructions}</p> : null}
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={button}>Submit Order</button>















            }
    </form>
    )
}
export default Form;