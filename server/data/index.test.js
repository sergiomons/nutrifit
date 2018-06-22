'use strict'

require('dotenv').config()

const { mongoose, models: { User, Order, Product, Category } } = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('models nutrifit', function () {
    this.timeout(3000)
    let sergioData, johnData, pack_CategoryData, proteinCategoryData, veganCategoryData, pack_S_CategoryData, pack_M_CategoryData, pack_L_CategoryData, pack_L_C_CategoryData, pack_XL_CategoryData, packMuscle_Data, packMuscle_S_Data, packMuscle_M_Data, packMuscle_L_Data, packMuscle_L_C_Data, packMuscle_XL_Data

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        sergioData = { name: 'Sergio', surname: 'M', username: 'sergi', email: 'ser@email.com', password: '123', address: 'Calle V', phone: '123456789' }
        johnData = { name: 'John', surname: 'W', username: 'jwaine', email: 'jw@email.com', password: '123', address: 'Calle J', phone: '987654321' }

        pack_CategoryData = { image: 'http://images.com/1234', name: 'Pack' }
        proteinCategoryData = { image: 'http://images.com/1234', name: 'Protein' }
        veganCategoryData = { image: 'http://images.com/1234', name: 'Vegan' }
        pack_S_CategoryData = { image: 'http://images.com/1234', name: 'Pack S (category)' }
        pack_M_CategoryData = { image: 'http://images.com/1234', name: 'Pack M (category)' }
        pack_L_CategoryData = { image: 'http://images.com/1234', name: 'Pack L (category)' }
        pack_L_C_CategoryData = { image: 'http://images.com/1234', name: 'Pack L-C (category)' }
        pack_XL_CategoryData = { image: 'http://images.com/1234', name: 'Pack XL (category)' }

        packMuscle_Data = { image: 'http://images.com/1234', name: 'Pack Muscle (product)', description: 'Pack Muscle desc', price: 100 }
        packMuscle_S_Data = { image: 'http://images.com/4566', name: 'Pack Muscle S (product)', description: 'Pack Muscle S desc', price: 50 }
        packMuscle_M_Data = { image: 'http://images.com/4566', name: 'Pack Muscle M (product)', description: 'Pack Muscle M desc', price: 75 }
        packMuscle_L_Data = { image: 'http://images.com/4566', name: 'Pack Muscle L (product)', description: 'Pack Muscle L desc', price: 80 }
        packMuscle_L_C_Data = { image: 'http://images.com/4566', name: 'Pack Muscle L-C (product)', description: 'Pack Muscle L-C desc', price: 80 }
        packMuscle_XL_Data = { image: 'http://images.com/4566', name: 'Pack Muscle XL (product)', description: 'Pack Muscle XL desc', price: 85 }

        return Promise.all([User.remove(), Product.deleteMany(), Category.deleteMany()])
    })

    describe('create user', () => {
        it('should succeed on correct data', () => {
            const user = new User(sergioData)

            return user.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist
                    expect(user.name).to.equal(sergioData.name)
                    expect(user.surname).to.equal(sergioData.surname)
                    expect(user.phone).to.equal(sergioData.phone)
                    expect(user.email).to.equal(sergioData.email)
                    expect(user.address).to.equal(sergioData.address)
                    expect(user.username).to.equal(sergioData.username)
                    expect(user.password).to.equal(sergioData.password)
                })
        })
    })

    describe('create category hierarchy', () => {
        it('should succeed on correct data', () => {
            return Promise.all([
                new Category(pack_CategoryData).save(),
                new Category(pack_S_CategoryData).save(),
                new Category(pack_M_CategoryData).save(),
                new Category(pack_L_CategoryData).save(),
                new Category(pack_L_C_CategoryData).save(),
                new Category(pack_XL_CategoryData).save()
            ])
                .then(([pack_Category, pack_S_Category, pack_M_Category, pack_L_Category, pack_L_C_Category, pack_XL_Category]) => {
                    pack_S_Category.parent = pack_Category._id
                    pack_M_Category.parent = pack_Category._id
                    pack_L_Category.parent = pack_Category._id
                    pack_XL_Category.parent = pack_Category._id

                    pack_L_C_Category.parent = pack_L_Category._id

                    return Promise.all([
                        pack_S_Category.save(),
                        pack_M_Category.save(),
                        pack_L_Category.save(),
                        pack_L_C_Category.save(),
                        pack_XL_Category.save()
                    ])
                        .then(([pack_S_Category, pack_M_Category, pack_L_Category, pack_L_C_Category, pack_XL_Category]) => {
                            expect(pack_S_Category.name).to.equal(pack_S_CategoryData.name)
                            expect(pack_S_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_M_Category.name).to.equal(pack_M_CategoryData.name)
                            expect(pack_M_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_L_Category.name).to.equal(pack_L_CategoryData.name)
                            expect(pack_L_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_L_C_Category.name).to.equal(pack_L_C_CategoryData.name)
                            expect(pack_L_C_Category.parent.toString()).to.equal(pack_L_Category._id.toString())

                            expect(pack_XL_Category.name).to.equal(pack_XL_CategoryData.name)
                            expect(pack_XL_Category.parent.toString()).to.equal(pack_Category._id.toString())
                        })
                })
        })
    })

    describe('create products', () => {
        it('should succeed on correct data', () => {
            return new Category(pack_CategoryData).save()
                .then(category => {
                    packMuscle_Data.category = category._id
                    packMuscle_S_Data.category = category._id
                    packMuscle_M_Data.category = category._id

                    return Promise.all([
                        new Product(packMuscle_Data).save(),
                        new Product(packMuscle_S_Data).save(),
                        new Product(packMuscle_M_Data).save(),
                    ])
                        .then(([pack_Muscle, packMuscle_S_, packMuscle_M_]) => {

                            const arrayProducts = [pack_Muscle, packMuscle_S_, packMuscle_M_];

                            expect(arrayProducts.length).to.equal(3)
                            expect(pack_Muscle._doc._id.toString()).to.exist
                            expect(pack_Muscle.name).to.equal(packMuscle_Data.name)
                            expect(packMuscle_S_._doc._id.toString()).to.exist
                            expect(packMuscle_S_.name).to.equal(packMuscle_S_Data.name)
                            expect(packMuscle_M_._doc._id.toString()).to.exist
                            expect(packMuscle_M_.name).to.equal(packMuscle_M_Data.name)
                        })
                })
        })
    })

    describe('list products by category (linked directly to the category, or indirectly through sub-categories)', () => {
        it('should succeed on correct data', () => {
            return Promise.all([
                new Category(pack_CategoryData).save(),
                new Category(pack_S_CategoryData).save(),
                new Category(pack_M_CategoryData).save(),
                new Category(pack_L_CategoryData).save(),
                new Category(pack_L_C_CategoryData).save(),
                new Category(pack_XL_CategoryData).save()
            ])
                .then(([pack_Category, pack_S_Category, pack_M_Category, pack_L_Category, pack_L_C_Category, pack_XL_Category]) => {
                    pack_S_Category.parent = pack_Category._id
                    pack_M_Category.parent = pack_Category._id
                    pack_L_Category.parent = pack_Category._id
                    pack_XL_Category.parent = pack_Category._id

                    pack_L_C_Category.parent = pack_L_Category._id

                    return Promise.all([
                        pack_S_Category.save(),
                        pack_M_Category.save(),
                        pack_L_Category.save(),
                        pack_L_C_Category.save(),
                        pack_XL_Category.save()
                    ])
                        .then(([pack_S_Category, pack_M_Category, pack_L_Category, pack_L_C_Category, pack_XL_Category]) => {
                            expect(pack_S_Category.name).to.equal(pack_S_CategoryData.name)
                            expect(pack_S_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_M_Category.name).to.equal(pack_M_CategoryData.name)
                            expect(pack_M_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_L_Category.name).to.equal(pack_L_CategoryData.name)
                            expect(pack_L_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            expect(pack_L_C_Category.name).to.equal(pack_L_C_CategoryData.name)
                            expect(pack_L_C_Category.parent.toString()).to.equal(pack_L_Category._id.toString())

                            expect(pack_XL_Category.name).to.equal(pack_XL_CategoryData.name)
                            expect(pack_XL_Category.parent.toString()).to.equal(pack_Category._id.toString())

                            packMuscle_Data.category = pack_Category._id

                            packMuscle_S_Data.category = pack_S_Category._id
                            packMuscle_M_Data.category = pack_M_Category._id
                            packMuscle_L_Data.category = pack_L_Category._id
                            packMuscle_XL_Data.category = pack_XL_Category._id

                            packMuscle_L_C_Data.category = pack_L_C_Category._id

                            return Promise.all([
                                new Product(packMuscle_Data).save(),
                                new Product(packMuscle_S_Data).save(),
                                new Product(packMuscle_M_Data).save(),
                                new Product(packMuscle_L_Data).save(),
                                new Product(packMuscle_L_C_Data).save(),
                                new Product(packMuscle_XL_Data).save()
                            ])
                                .then(([packMuscle, packMuscle_S, packMuscle_M, packMuscle_L, packMuscle_L_C, packMuscle_XL]) => {
                                    expect(packMuscle.category.toString()).to.equal(pack_Category._id.toString())

                                    expect(packMuscle.category.toString()).to.equal(pack_Category._id.toString())
                                    expect(packMuscle_S.category.toString()).to.equal(pack_S_Category._id.toString())
                                    expect(packMuscle_M.category.toString()).to.equal(pack_M_Category._id.toString())
                                    expect(packMuscle_L.category.toString()).to.equal(pack_L_Category._id.toString())
                                    expect(packMuscle_XL.category.toString()).to.equal(pack_XL_Category._id.toString())

                                    expect(packMuscle_L_C.category.toString()).to.equal(pack_L_C_Category._id.toString())

                                    const categoryId = pack_Category._id.toString()

                                    return Category.find({ parent: categoryId })
                                        .then(res => {
                                            const ids = [categoryId]

                                            return Promise.all(
                                                res.map(({ _doc: category }) => {
                                                    ids.push(category._id.toString())

                                                    return Category.find({ parent: category._id })
                                                })
                                            )
                                                .then(res => {

                                                    const withResults = res.filter(res => res.length)

                                                    withResults.forEach(res => {
                                                        res.forEach(({ _doc: category }) => ids.push(category._id.toString()))
                                                    })

                                                    // TODO how to make this recursive?

                                                    return Product.find({ category: { $in: ids } })
                                                        .then(res => {

                                                            expect(res.length).to.equal(6)

                                                            const [product1, product2, product3, product4, product5, product6] = res

                                                            const validIds = [
                                                                packMuscle._id.toString(),
                                                                packMuscle_S._id.toString(),
                                                                packMuscle_M._id.toString(),
                                                                packMuscle_L._id.toString(),
                                                                packMuscle_XL._id.toString(),
                                                                packMuscle_L_C._id.toString()
                                                            ]

                                                            expect(validIds).to.include(product1._doc._id.toString())
                                                            expect(validIds).to.include(product2._doc._id.toString())
                                                            expect(validIds).to.include(product3._doc._id.toString())
                                                            expect(validIds).to.include(product4._doc._id.toString())
                                                            expect(validIds).to.include(product5._doc._id.toString())
                                                            expect(validIds).to.include(product6._doc._id.toString())
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})