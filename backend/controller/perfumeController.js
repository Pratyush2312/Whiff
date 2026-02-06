import express from 'express'
import { Perfume } from "../models/perfume.js"

export const getPerfumes = async (req, res) => {
    try{
        const data = await Perfume.find()
        if(!data){
            return res.status(404).json({message: "Perfumes not found"})
        }
        res.send(data)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getPerfumesByslug = async (req, res) => {
    try {
        const slug = req.params.slug
        const data = await Perfume.findOne({ slug: slug })
        if (!data) {
            return res.status(404).json({ message: "Perfume not found" });
        }
        res.json(data)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
