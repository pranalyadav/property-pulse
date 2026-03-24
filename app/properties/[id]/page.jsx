"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/request'

const PropertyPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPropertdata = async () => {
            if (!id) return
            try {
                const property = await fetchProperty(id)
                setProperty(property)
            } catch (error) {
                console.error("Error fetching property:", error)
            } finally {
                setLoading(false)
            }
        }

        if (property === null) {
            fetchPropertdata();
        }

    }, [id, property])

    return (
        <div>
            PropertyPage
        </div>
    )
}

export default PropertyPage