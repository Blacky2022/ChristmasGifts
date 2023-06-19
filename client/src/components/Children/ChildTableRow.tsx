import React from 'react'
import { ChildEntity, GiftEntity } from 'types'
import { ChildGiftSelect } from './ChildGiftSelect'

interface Props {
    child: ChildEntity;
    giftsList: GiftEntity[];
}

export const ChildTableRow = (props: Props) => {
    return (
        <tr>
            <td>{props.child.name}</td>
            <td>
                <ChildGiftSelect
                    giftsList={props.giftsList}
                    selectedId={props.child.giftid}
                    childId={props.child.id as string}
                />
            </td>
        </tr>
    );
};
