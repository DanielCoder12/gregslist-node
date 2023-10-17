import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            // .get('', this.test)
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .delete('/:houseId', this.destroyHouse)
            .put('/:houseId', this.updateHouse)
    }


    test(request, response, next) {
        response.send('testing')
    }
    async getHouses(request, response, next) {
        try {
            const houses = await housesService.getHouses()
            response.send(houses)
        } catch (error) {
            next(error)
        }

    }

    async getHouseById(request, response, next) {
        try {
            const houseId = request.params.houseId
            const foundHouse = await housesService.getHouseById(houseId)
            response.send(foundHouse)
        } catch (error) {
            next(error)
        }
    }

    async createHouse(request, response, next) {
        try {
            const houseData = request.body
            const userData = request.userInfo
            houseData.creatorId = userData.id
            const createdHouse = await housesService.createHouse(houseData, userData)
            response.send(createdHouse)
        } catch (error) {
            next(error)
        }
    }

    async destroyHouse(request, response, next) {
        try {
            const userId = request.userInfo.id
            const houseId = request.params.houseId
            const destroyedHouse = await housesService.destroyHouse(userId, houseId)
            response.send(destroyedHouse)
        } catch (error) {
            next(error)
        }
    }
    async updateHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const updatedHouseData = request.body
            const userId = request.userInfo.id
            const updatedHouse = await housesService.updateHouse(updatedHouseData, userId, houseId)
            response.send(updatedHouse)
        } catch (error) {
            next(error)
        }
    }

}