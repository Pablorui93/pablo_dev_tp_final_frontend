import React from 'react'
import useForm from '../../hooks/useForm'
import './CreateNewMessage.css'

const CreateNewMessage = ({onSubmit}) => {
    const new_message_form_field={
        content:'content',
    }

    const initial_new_message_state={
        [new_message_form_field.content]: ''
    }
    console.log(onSubmit)

    const {form_state, onInputChange, handleSubmit} = useForm(
        initial_new_message_state,
        onSubmit
    )

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className='input-form'
                    type="text"
                    placeholder="nuevo mensaje"
                    id="content"
                    name='content'
                    value={form_state[new_message_form_field.content]}
                    onChange={onInputChange}
                />
                <button className='button-new-message' type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CreateNewMessage