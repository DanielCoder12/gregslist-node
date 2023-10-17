
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
    async updateHouse(houseData, userId, houseId) {
        const updateHouse = await this.getHouseById(houseId)
        if (updateHouse.creatorId != userId) {
            throw new Forbidden('this isnt your house')
        }

        updateHouse.bedrooms = houseData.bedrooms || updateHouse.bedrooms
        updateHouse.bathrooms = houseData.bathrooms || updateHouse.bathrooms
        updateHouse.year = houseData.year || updateHouse.year
        updateHouse.price = houseData.price || updateHouse.price
        updateHouse.imgUrl = houseData.imgUrl || updateHouse.imgUrl
        updateHouse.description = houseData.description || updateHouse.description

        await updateHouse.save()
        return updateHouse

    }
    async createHouse(houseData, userData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        if (!house) {
            throw new BadRequest(`${houseId}is not a good id`)
        }
        return house
    }
    getHouses() {
        const houses = dbContext.Houses.find()
        return houses
    }

    async destroyHouse(userId, houseId) {
        const destroyedHouse = await this.getHouseById(houseId)
        if (destroyedHouse.creatorId != userId) {
            throw new Forbidden('this is not your house')
        }
        await destroyedHouse.remove()
        return destroyedHouse


    }
}

export const housesService = new HousesService()