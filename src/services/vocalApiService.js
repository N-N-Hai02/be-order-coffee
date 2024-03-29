import db from '../models/index'
import { checkExistEnglish } from './checkExistService'

const readFunc = async () => {
    try {
        let vocals = await db.Vocal.findAll({
            attributes: ['id', "en", "vn", "spelling", 'example_en', 'example_vn', 'levelId'],
            order: [["id", "DESC"]],
            raw: true,
            nest: true
        })
        if (vocals) {
            return {
                EM: "Get vocal data success..!",
                EC: 0,
                DT: vocals
            }
        } else {
            return {
                EM: "Get don't data success",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrongs with vocal service",
            EC: 1,
            DT: []
        }
    }
}

const createFunc = async (rawData) => {
    try {
        if (rawData.length === 1) {
            let isEnglishExits = await checkExistEnglish(rawData[0].en)
            if (isEnglishExits === true) {
                return {
                    EM: 'The English is already exiteds!',
                    EC: 2,
                    DT: 'en',
                }
            }
        }

        let currentVocals = await db.Vocal.findAll({
            attributes: ['en'],
            raw: true
        })

        const persist = rawData.filter(({ en: name1 }) => !currentVocals.some(({ en: name2 }) => name2 === name1))

        if (persist && persist.length === 0) {
            return {
                EM: "Vocal created error..!",
                EC: 2,
                DT: []
            }
        }

        await db.Vocal.bulkCreate(persist)
        return {
            EM: `Create ${persist.length} vocalbulary oke!`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error not server..!",
            EC: 1,
            DT: []
        }
    }
}

const updateVocal = async (data) => {
    try {
        if (!data.levelId) {
            return {
                EM: 'Error with empty levelId',
                EC: 1,
                DT: 'levelId'
            }
        } 
        let vocal = await db.Vocal.findOne({
            where: { id: data.id }
        })
        if (vocal) {
            // update
            await vocal.update({
                en: data.en,
                vn: data.vn,
                spelling: data.spelling,
                example_en: data.example_en,
                example_vn: data.example_vn,
                levelId: data.levelId
            })
            return {
                EM: 'Update Vocal oke..!',
                EC: 0,
                DT: ''
            }
        } else {
            // not found
            console.log(error)
            return {
                EM: 'Update Vocal not found!',
                EC: 2,
                DT: ''
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}

const deleteVocal = async (id) => {
    try {
        let vocal = await db.Vocal.findOne({
            where: { id: id }
        })
        if (vocal) {
            await vocal.destroy();
            return {
                EM: "Delete vocal successfully!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "Vocal not exits",
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error form services',
            EC: 1,
            DT: []
        }
    }
}

const checkExistUserVocal = async (data) => {
    let check = await db.User_Vocal.findOne({
        where: { userId: data.userId, vocalId: data.vocalId  }
    })
    if (check) return true
    return false
}
const assignVocalToUser = async (data) => {
    try {
        let isUserVocalExits = await checkExistUserVocal(data)
        if (isUserVocalExits === true) {
            return {
                EM: 'The assign vocal to user is already exiteds!',
                EC: 2,
                DT: '',
            }
        }
        await db.User_Vocal.create(data)
        return {
            EM: `assign vocal to user oke!`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error not server..!",
            EC: 1,
            DT: []
        }
    }
}

const getVocalByUser = async () => {
    try {
        let vocalByUser = await db.User_Vocal.findAll({
            attributes: ['userId', 'vocalId'],
            raw: true,
            nest: true
        })
        if (vocalByUser) {
            return {
                EM: "Get user by vocal data success..!",
                EC: 0,
                DT: vocalByUser
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrongs with user by vocal service",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    readFunc, createFunc, updateVocal, deleteVocal, assignVocalToUser, getVocalByUser
}