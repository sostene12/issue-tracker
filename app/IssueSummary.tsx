import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react';


interface Props{
    open:number;
    inProgress:number;
    closed:number;
}

const IssueSummary = ({ open,inProgress,closed }:Props) => {
    const statuses:{label:string,value:number,status:Status}[] = [
        {label: 'Open Issues',value: open,status: 'OPEN'},
        {label: 'In-progess Issues',value: inProgress,status: 'IN_PROGRESS'},
        {label: 'Closed Issues',value: closed,status: 'CLOSED'},
    ]
  return (
    <Flex gap="3">
        {statuses.map(stat => (
            <Card key={stat.label}> 
                <Flex direction="column" gap="1">
                    <Link href={`/issues/list?status=${stat.status}`} className='text-sm font-medium'>{stat.label}</Link>
                    <Text size="5" className='font-bold'>{stat.value}</Text>
                </Flex>
             </Card>
        ))}
    </Flex>
  )
}

export default IssueSummary