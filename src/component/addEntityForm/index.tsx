import { UseMutateFunction } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

import './index.scss';

interface AddEntityFormProps {
    data: DivisionNode;
    action: UseMutateFunction<any, Error, {
        parent: DivisionNode;
        name: string;
        type: EntityType;
    }, unknown>
}
const addEntityForm = ({ data, action }: AddEntityFormProps) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<EntityType>('USER' as EntityType);

    const submit = () => {
        action({ parent: data, name, type });
    }

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    }

    return (
        <section data-testid="add-entity-form" className='mt-4 add-entity-form-wrapper' onClick={onClick}>
            <h3>Add Entity</h3>
            <label>Name</label>
            <input data-testid='add-entity-form-input' type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
            <label>type</label>
            <select
                data-testid='add-entity-form-select'
                value={type}
                name='type'
                onChange={e => setType(e.target.value as EntityType)}
            >
                <option value='EQUIPMENT'>{'EQUIPMENT'}</option>
                <option value='USER'>{'USER'}</option>
                <option value='JOBS'>{'JOB'}</option>
            </select>
            <Button data-testid='add-entity-form-submit' variant="primary" size='sm' onClick={submit}>Submit</Button>
        </section>
    )
}

export default addEntityForm;