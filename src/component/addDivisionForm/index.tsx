import { UseMutateFunction, UseMutationResult } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';

import './index.scss';
import { useState } from 'react';

interface AddDivisionFormProps {
    data: DivisionNode;
    action: UseMutateFunction<any, Error, {
        parent: DivisionNode;
        name: string;
    }, unknown>
}

const AddDivisionForm = ({ data, action }: AddDivisionFormProps) => {
    const [name, setName] = useState('');
    const submit = () => {
        action({ parent: data, name });
    }

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    }

    return (
        <section className='mt-4 add-division-form-wrapper' onClick={onClick}>
            <h3>Add Division</h3>
            <label>Name</label>
            <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
            <Button variant="primary" size='sm' onClick={submit}>Submit</Button>
        </section>
    )
}

export default AddDivisionForm;