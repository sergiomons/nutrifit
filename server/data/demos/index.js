'use strict'

require('dotenv').config()

const { User, Order, Product, Category } = require('../models')
const { mongoose } = require('../../data')

const { env: { DB_URL } } = process

mongoose.connect(DB_URL)
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => {

        // parentCategories
        let packsCategoryData = { image: 'http://images.com/1234', name: "Packs" }
        let individualsCategoryData = { image: 'http://images.com/1234', name: "Individual" }

        // Children individualsCategoryData
        let meatCategoryData = { image: 'http://blogs.lanacion.com.ar/cocina-amateur/files/2013/01/DSC_0006-copia.jpg', name: "Carne" }
        let soupCategoryData = { image: 'https://comidasperuanas.net/wp-content/uploads/2017/01/Sopa-de-Pollo-Peruana.jpg', name: "Sopa" }
        let fishCategoryData = { image: 'http://www.grecotour.com/blog-grecia/wp-content/uploads/2015/03/plato-tipico-griego-pescado.jpg', name: "Pescado" }
        let pastaCategoryData = { image: 'http://sevilla.abc.es/gurme//wp-content/uploads/2013/03/bucatinis-carbonara-1440x810.jpg', name: "Pasta" }
        let proteinCategoryData = { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Em3ncT1FAjSzG1YYW_N_75fo3MJ2auNuCgBIvVE9kxIOLu6R', name: "Proteinas" }
        let vegetarianCategoryData = { image: 'http://resize1-doctissimocom.ladmedia.fr/r/940,,force/crop/940,470/img/var/doctissimo/storage/images/common/nutricion/galerias-nutricion/recetas-buddha-bowl/437573-2-esl-ES/buddha-bowl-10-recetas-de-platos-vegetarianos-completos.jpg', name: "Vegetarian" }
        let veganCategoryData = { image: 'https://voilaelisa.files.wordpress.com/2015/11/buddha_bowl_verduras_horneadas_salteadas_plato_vegetariano_veggie_vegano.jpg', name: "Vegan" }

        // products packCategories
        let packMuscleData = { image: 'https://deportesaludable.com/wp-content/uploads/2018/05/six-pack_1000x600.jpg', name: 'Pack Muscle', description: ['Plan nutritivo orientado a POTENCIAR LA MUSCULATURA', '1 plan semanal', '4 raciones diarias' ], price: 100 }
        let packBodyTonicData = { image: 'https://www.perfectnutrition.es/76/dieta-2200-descarga-o-bajada-de-peso.jpg', name: 'Pack Body Tonic', description: ['Plan nutritivo orientado a TONIFICAR SU CUERPO', '1 plan semanal', '4 raciones diarias' ], price: 90 }
        let packBurningData = { image: 'https://bodycultures.com/wp-content/uploads/2016/12/shutterstock_527734021.jpg', name: 'Pack Burning', description: ['Plan nutritivo orientado a QUEMAR LA GRASA', '1 plan semanal', '4 raciones diarias' ], price: 85 }
        let packHealthyData = { image: 'https://hips.hearstapps.com/del.h-cdn.co/assets/17/06/1486402920-delish-rainbow-chicken-veggies-2.jpg', name: 'Pack Healthy', description: ['Plan nutritivo de COMIDA SALUDABLE', '1 plan semanal', '4 raciones diarias' ], price: 105 }
        let packVeganData = { image: 'https://www.eatthis.com/content/uploads//media/images/ext/561750295/avocado-recipes.jpg', name: 'Pack Vegan', description: ['Plan nutritivo orientado a PERSONAS VEGANAS', '1 plan semanal', '4 raciones diarias' ], price: 95 }
        let packNoGlutenData = { image: 'https://static.ulabox.com/media/94390_banner-tablet.jpg', name: 'Pack No Gluten', description: ['Plan nutritivo de COMIDA SIN GLUTEN', '1 plan semanal', '4 raciones diarias' ], price: 100 }

        // products individualsCategory
        // products meatCategory
        let polloVerdurasData = { image: 'https://www.deliciosi.com/images/1000/1070/pollo-con-verduras.jpg', name: 'Pollo con verduras', description: ['100 grs de filete de pollo', '50 grs de verdura mixta', '30 grs de patatas'], price: 4.25}
        let terneraData = { image: 'http://sevilla.abc.es/gurme//wp-content/uploads/2010/12/solomillo-relleno-de-foie-gras.jpg', name: 'Ternera asada', description:  ['75 grs de filete de ternera', '40 grs de tomate natural', '20 grs de patatas'], price: 4}
        let polloArrozData = { image: 'https://www.cocinavital.mx/wp-content/uploads/2017/08/muslos-de-pollo-con-arroz.jpg', name: 'Pollo con arroz', description: ['80 grs de filete de pollo', '50 grs de arroz', '25 grs de verduras'], price: 4.50 }

        // products soupCategory
        let sopaVerdurasData = { image: 'https://www.gallinablanca.es/files/thumbs/f51760b4f01866747bd746fce85c8130113e5ac2_r900_480_2.jpg', name: 'Sopa de verduras', description: ['150 ml de caldo gallina blanca', '45 grs de verduras'], price: 3 }
        let sopaMariscoData = { image: 'https://www.lacocinadeelisa.es/wp-content/uploads/2017/07/sopa-de-marisco.jpg', name: 'Sopa de marisco', description: ['140 ml de sopa', '60 grs de marisco variado', '20 grs de tomate triturado'], price: 3.25 }

        // products fishCategory
        let pescadoPlanchaData = { image: 'http://www.dietistapamplona.es/wp-content/uploads/2016/02/trucos-de-cocina-para-reducir-las-calorias-segundos-platos-dietista-pamplona-1030x480.jpg', name: 'Pescado a la plancha', description: ['80 grs de pescado blanco', '40 grs de patatas', 'Aceite de oliva virgen extra'], price: 4 }
        let salmonData = { image: 'https://previews.123rf.com/images/mashe/mashe1008/mashe100800834/7709772-plato-de-pescado-salm%C3%B3n-a-la-parrilla-con-verduras-.jpg', name: 'Salmón ahumado', description: 'Salmón ahumado desc', price: 3.75, elements: ['90 grs de Salmón', '40 grs de patatas', 'Finas hierbas'] }
        let pescadoVerdurasData = { image: 'https://st.depositphotos.com/1003814/3365/i/950/depositphotos_33650631-stock-photo-fish-dish-fried-fish-fillet.jpg', name: 'Pescado con verduras', description: ['75 grs de pescado', '60 grs de verduras', 'Aceite de oliva virgen extra'], price: 4 }

        // products pastaCategory
        let tallarinesData = { image: 'http://blovver.com/wp-content/uploads/2014/07/salsas-con-mas-calorias.jpg', name: 'Tallarines con verdura', description: ['75 grs de pasta tallarines', '50 grs de verduras', '40 grs de tomate natural triturado'], price: 4.25 } 
        let espaguetiData = { image: 'https://tendencybook.com/wp-content/uploads/2017/01/espagueti-1-e1483548697583.jpg', name: 'Espagueti mediterráneo', description: ['85 grs de espaguetti largo', '40 grs de variedad mediterránea', 'Aceite de oliva virgen extra'], price: 4.50 }
        let macarronesIntegralesData = { image: 'https://img-global.cpcdn.com/002_recipes/6b58caa3d397d663/751x532cq70/photo.jpg', name: 'Macarrones integrales', description: ['80 grs de macarrones tipo integral', '35 grs de salsa ', '40 grs de tomate natural triturado'], price: 4.50 }

        // products riceCategory
        let arrozIntegralData = { image: 'https://www.hogarmania.com/archivos/201105/042-arroz-integral-con-verduras-xl-668x400x80xX.jpg', name: 'Arroz integral', description: ['80 grs de arroz tipo integral', '50 grs de salsa ', '45 grs de tomate natural triturado'], price: 4.25 }
        let arrozRemolachaData = { image: 'https://c1.staticflickr.com/1/505/19028011976_051b716435_b.jpg', name: 'Arroz con remolacha', description: ['75 grs de arroz normal', '40 grs de remolacha en tiras', '20 grs de zanahoria triturada'], price: 4.40 }
        let risottoData = { image: 'http://sevilla.abc.es/gurme//wp-content/uploads/2015/01/risotto-de-hongos-y-foie.jpg', name: 'Risotto', description: ['80 grs de arroz', '40 grs de setas', '50 grs de filete de pollo'], price: 4.50 }

        // products vegetarianCategory
        let ensaladaColData = { image: 'http://blogs.menshealth.es/truco-o-plato/wp-content/uploads/sites/18/2016/08/IMG_2403-1024x683.jpg', name: 'Ensalada de col', description: ['75 grs de col en tiras', '35 grs de zanahorias en tiras', '30 grs de maiz', '20 grs de tacos de jamon york'], price: 3.75 }
        let tacosFrijolesData = { image: 'http://www.recetasveganas.es/wp-content/uploads/2016/05/Tacos-de-frijoles-y-aguacate.jpg', name: 'tacos de frijoles', description: ['1 tortilla de maiz', '80 grs de frijoles', '40 grs de aguacate trozeado', '40 grs de salsa de tomate', 'verduras mixtas'], price: 4.25 }
        let pastelesCamoteData = { image: 'http://milrecetas.net/wp-content/uploads/2017/07/torta-de-camote.jpg', name: 'Pasteles de camotes', description: ['90 grs de nuez moscada', '35 grs de queso semiduro', '40 grs de uvas pasadas'], price: 4 }

        // products veganCategory
        let berenjenasData = { image: 'https://www.ecestaticos.com/imagestatic/clipping/817/668/81766840a8e307f58e11bd6650130d25/berenjenas-con-salsa-miso-la-huerta-y-el-aroma-de-japon-en-tu-mesa.jpg?mtime=1477912755', name: 'Berenjenas al miso', description: ['85 grs de berenjena asada', '35 grs de salsa sake', '30 grs de miso rojo', 'Aceite sésamo'], price: 4.25 }
        let salteadoBrocoliData = { image: 'http://www.eltomaterojo.com/wp-content/uploads/2015/10/pollo-salteado-con-brocoli-y-champi%C3%B1ones.jpg', name: 'Salteado de Brocóli', description: ['90 grs de brócoli', '35 grs de champiñones', '20 grs de salsa de soja'], price: 4 }
        let tortillaSinData = { image: 'https://lacucharaveggie.com/wp-content/uploads/2016/03/Tortilla-vegana.jpg', name: 'Tortilla sin huevos', description: ['90 grs de patatas', '35 grs de cebolla', 'Cúrcuma'], price: 4.50 }

        return Promise.all([
            // Parents Category

            Category.create(packsCategoryData),
            Category.create(individualsCategoryData),
        ])
            .then(([packsCategory, individualsCategory]) => {

                //Subcategories
                meatCategoryData.parent = individualsCategory._id;
                soupCategoryData.parent = individualsCategory._id;
                fishCategoryData.parent = individualsCategory._id;
                pastaCategoryData.parent = individualsCategory._id;
                proteinCategoryData.parent = individualsCategory._id;
                vegetarianCategoryData.parent = individualsCategory._id;
                veganCategoryData.parent = individualsCategory._id;

                return Promise.all([
                    Category.create(meatCategoryData),
                    Category.create(soupCategoryData),
                    Category.create(fishCategoryData),
                    Category.create(pastaCategoryData),
                    Category.create(proteinCategoryData),
                    Category.create(vegetarianCategoryData),
                    Category.create(veganCategoryData)
                ])
                    .then(([meatCategory, soupCategory, fishCategory, pastaCategory, proteinCategory,
                        vegetarianCategory, veganCategory]) => {

                        // Set category to products PacksCategory
                        packMuscleData.category = packsCategory._id;
                        packBodyTonicData.category = packsCategory._id;
                        packBurningData.category = packsCategory._id;
                        packHealthyData.category = packsCategory._id;
                        packVeganData.category = packsCategory._id;
                        packNoGlutenData.category = packsCategory._id;

                        // Set category to products individualsCategory
                        polloVerdurasData.category = meatCategory._id;
                        terneraData.category = meatCategory._id;
                        polloArrozData.category = meatCategory._id;

                        sopaVerdurasData.category = soupCategory._id;
                        sopaMariscoData.category = soupCategory._id;

                        pescadoPlanchaData.category = fishCategory._id;
                        salmonData.category = fishCategory._id;
                        pescadoVerdurasData.category = fishCategory._id;

                        tallarinesData.category = pastaCategory._id;
                        espaguetiData.category = pastaCategory._id;
                        macarronesIntegralesData.category = pastaCategory._id;

                        arrozIntegralData.category = proteinCategory._id;
                        arrozRemolachaData.category = proteinCategory._id;
                        risottoData.category = proteinCategory._id;

                        ensaladaColData.category = vegetarianCategory._id;
                        tacosFrijolesData.category = vegetarianCategory._id;
                        pastelesCamoteData.category = vegetarianCategory._id;

                        berenjenasData.category = veganCategory._id;
                        salteadoBrocoliData.category = veganCategory._id;
                        tortillaSinData.category = veganCategory._id;

                        return Promise.all([

                            // PacksCategory
                            Product.create(packMuscleData),
                            Product.create(packBodyTonicData),
                            Product.create(packBurningData),
                            Product.create(packHealthyData),
                            Product.create(packVeganData),
                            Product.create(packNoGlutenData),

                            // Products IndividualsCategory
                            Product.create(polloVerdurasData),
                            Product.create(terneraData),
                            Product.create(polloArrozData),
                            Product.create(sopaVerdurasData),
                            Product.create(sopaMariscoData),
                            Product.create(pescadoPlanchaData),
                            Product.create(salmonData),
                            Product.create(pescadoVerdurasData),
                            Product.create(tallarinesData),
                            Product.create(espaguetiData),
                            Product.create(macarronesIntegralesData),
                            Product.create(arrozIntegralData),
                            Product.create(arrozRemolachaData),
                            Product.create(risottoData),
                            Product.create(ensaladaColData),
                            Product.create(tacosFrijolesData),
                            Product.create(pastelesCamoteData),
                            Product.create(berenjenasData),
                            Product.create(salteadoBrocoliData),
                            Product.create(tortillaSinData),
                        ])
                    })
            })

    })
    .then(() => User.create({ name: 'John', surname: 'Doe', username: 'johndoe', email: 'jd@mail.com', password: '123', phone: '+34 123 456 789' }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('done'))
    .catch(console.error)

    
        //Children IndividualsCategory
        // new Category(meatCategoryData).save(),
        // new Category(soupCategoryData).save(),
        // new Category(fishCategoryData).save(),
        // new Category(pastaCategoryData).save(),
        // new Category(proteinCategoryData).save(),
        // new Category(vegetarianCategoryData).save(),
        // new Category(veganCategoryData).save(),
        //Products PacksCategory
        // new Product(packMuscleData).save(),
        // new Product(packBodyTonicData).save(),
        // new Product(packBurningData).save(),
        // new Product(packHealthyData).save(),
        // new Product(packVeganData).save(),
        // new Product(packNoGlutenData).save(),
        // Products IndividualsCategory
        //     new Product(polloVerdurasData).save(),
        //     new Product(terneraData).save(),
        //     new Product(polloArrozData).save(),
        //     new Product(sopaVerdurasData).save(),
        //     new Product(sopaMariscoData).save(),
        //     new Product(pescadoPlanchaData).save(),
        //     new Product(salmonData).save(),
        //     new Product(pescadoVerdurasData).save(),
        //     new Product(tallarinesData).save(),
        //     new Product(espaguetiData).save(),
        //     new Product(macarronesIntegralesData).save(),
        //     new Product(arrozIntegralData).save(),
        //     new Product(arrozRemolachaData).save(),
        //     new Product(risottoData).save(),
        //     new Product(ensaladaColData).save(),
        //     new Product(tacosFrijolesData).save(),
        //     new Product(pastelesCamoteData).save(),
        //     new Product(berenjenasData).save(),
        //     new Product(salteadoBrocoliData).save(),
        //     new Product(tortillaSinData).save()
        // ])
        //     .then(([packsCategory, individualsCategory, meatCategory, soupCategory, fishCategory, pastaCategory, proteinCategory,
        //         vegetarianCategory, veganCategory, packMuscle, packBodyTonic, packBurning, packHealthy, packVegan, packNoGluten,
        //         polloVerduras, ternera, polloArroz, sopaVerduras, sopaMarisco, pescadoPlancha, salmon, pescadoVerduras, tallarines,
        //         espagueti, macarronesIntegrales, arrozIntegral, arrozRemolacha, risotto, ensaladaCol, tacosFrijoles, pastelesCamote,
        //         berenjenas, salteadoBrocoli, tortillaSin]) => {

        // Set parent to child IndividualsCategory
        // meatCategory.parent = individualsCategory._id;
        // soupCategory.parent = individualsCategory._id;
        // fishCategory.parent = individualsCategory._id;
        // pastaCategory.parent = individualsCategory._id;
        // proteinCategory.parent = individualsCategory._id;
        // vegetarianCategory.parent = individualsCategory._id;
        // veganCategory.parent = individualsCategory._id;

        // Set category to products packsCategory
        // packMuscle.category = packsCategory._id;
        // packBodyTonic.category = packsCategory._id;
        // packBurning.category = packsCategory._id;
        // packHealthy.category = packsCategory._id;
        // packVegan.category = packsCategory._id;
        // packNoGluten.category = packsCategory._id;

        // Set category to products individualsCategory
        //     polloVerduras.category = meatCategory._id;
        //     ternera.category = meatCategory._id;
        //     polloArroz.category = meatCategory._id;

        //     sopaVerduras.category = soupCategory._id;
        //     sopaMarisco.category = soupCategory._id;

        //     pescadoPlancha.category = fishCategory._id;
        //     salmon.category = fishCategory._id;
        //     pescadoVerduras.category = fishCategory._id;

        //     tallarines.category = pastaCategory._id;
        //     espagueti.category = pastaCategory._id;
        //     macarronesIntegrales.category = pastaCategory._id;

        //     arrozIntegral.category = proteinCategory._id;
        //     arrozRemolacha.category = proteinCategory._id;
        //     risotto.category = proteinCategory._id;

        //     ensaladaCol.category = vegetarianCategory._id;
        //     tacosFrijoles.category = vegetarianCategory._id;
        //     pastelesCamote.category = vegetarianCategory._id;

        //     berenjenas.category = veganCategory._id;
        //     salteadoBrocoli.category = veganCategory._id;
        //     tortillaSin.category = veganCategory._id;

        //     return [meatCategory.save(), soupCategory.save(), fishCategory.save(), pastaCategory.save(), proteinCategory.save(),
        //     vegetarianCategory.save(), veganCategory.save(), packMuscle.save(), packBodyTonic.save(), packBurning.save(), packHealthy.save(), packVegan.save(), packNoGluten.save(),
        //     polloVerduras.save(), ternera.save(), polloArroz.save(), sopaVerduras.save(), sopaMarisco.save(), pescadoPlancha.save(), salmon.save(), pescadoVerduras.save(), tallarines.save(),
        //     espagueti.save(), macarronesIntegrales.save(), arrozIntegral.save(), arrozRemolacha.save(), risotto.save(), ensaladaCol.save(), tacosFrijoles.save(), pastelesCamote.save(),
        //     berenjenas.save(), salteadoBrocoli.save(), tortillaSin.save()]
        // })
        //  .then(() => {
        //      mongoose.connection.close()
        //      console.log('done')
        //  })


        // const arrayPromsisesParents =[ packsCategory, individualsCategory ]

        // const createParents = createData(arrayPromsisesParents)

        // const individualsCategoryId = individualsCategory.id

        // debugger

        // // Children individualsCategory
        // const meatCategoryData = { image: 'http://images.com/1234', name: "Carne", parent: individualsCategoryId }
        // const soupCategoryData = { image: 'http://images.com/1234', name: "Sopa", parent: individualsCategoryId }
        // const fishCategoryData = { image: 'http://images.com/1234', name: "Pescado", parent: individualsCategoryId }
        // const pastaCategoryData = { image: 'http://images.com/1234', name: "Pasta", parent: individualsCategoryId }
        // const proteinCategoryData = { image: 'http://images.com/1234', name: "Proteinas", parent: individualsCategoryId }
        // const vegetarianCategoryData = { image: 'http://images.com/1234', name: "Vegetarian", parent: individualsCategoryId }
        // const veganCategoryData = { image: 'http://images.com/1234', name: "Vegan", parent: individualsCategoryId }

        // const meatCategory = new Category(meatCategoryData).save()
        // const soupCategory = new Category(soupCategoryData).save()
        // const fishCategory = new Category(fishCategoryData).save()
        // const pastaCategory = new Category(pastaCategoryData).save()
        // const proteinCategory = new Category(proteinCategoryData).save()
        // const vegetarianCategory = new Category(vegetarianCategoryData).save()
        // const veganCategory = new Category(veganCategoryData).save()

        // // Array IndividualsCategory promises
        // const arrayIndividualsCategory = [meatCategory, soupCategory, fishCategory, pastaCategory, proteinCategory, vegetarianCategory, veganCategory]

        // // Save in data Base
        // const createChildrenIndividuals = createData(arrayIndividualsCategory)

        // // products packCategories
        // const packMuscleData = { image: 'http://images.com/1234', name: 'Pack Muscle', description: 'Pack Muscle desc', price: 100, category: packsCategory._id }
        // const packBodyTonicData = { image: 'http://images.com/1235', name: 'Pack Body Tonic', description: 'Pack Body Tonic desc', price: 90, category: packsCategory._id }
        // const packBurningData = { image: 'http://images.com/1234', name: 'Pack Burning', description: 'Pack Burning desc', price: 85, category: packsCategory._id }
        // const packHealthyData = { image: 'http://images.com/1234', name: 'Pack Healthy', description: 'Pack Healthy desc', price: 105, category: packsCategory._id }
        // const packVeganData = { image: 'http://images.com/1234', name: 'Pack Vegan', description: 'Pack Vegan desc', price: 95, category: packsCategory._id }
        // const packNoGlutenData = { image: 'http://images.com/1234', name: 'Pack No Gluten', description: 'Pack No Gluten desc', price: 100, category: packsCategory._id }

        // // products individualsCategory
        // // products meatCategory
        // const polloVerdurasData = { image: 'http://images.com/1234', name: 'Pollo con verduras', description: 'Pollo con verduras desc', price: 4.25, category: meatCategory._id }
        // const terneraData = { image: 'http://images.com/1234', name: 'Ternera asada', description: 'Ternera asada desc', price: 4, category: meatCategory._id }
        // const polloArrozData = { image: 'http://images.com/1234', name: 'Pollo con arroz', description: 'Pollo con arroz desc', price: 4.50, category: meatCategory._id }

        // // products soupCategory
        // const sopaVerdurasData = { image: 'http://images.com/1234', name: 'Sopa de verduras', description: 'Sopa de verduras desc', price: 3 }
        // const sopaMariscoData = { image: 'http://images.com/1234', name: 'Sopa de marisco', description: 'Sopa de marisco desc', price: 3.25 }

        // // products fishCategory
        // const pescadoPlanchaData = { image: 'http://images.com/1234', name: 'Pescado a la plancha', description: 'Pescado a la plancha desc', price: 4 }
        // const salmonData = { image: 'http://images.com/1234', name: 'Salmón ahumado', description: 'Salmón ahumado desc', price: 3.75 }
        // const pescadoVerdurasData = { image: 'http://images.com/1234', name: 'Pescado con verduras', description: 'Pescado con verduras desc', price: 4 }

        // // products pastaCategory
        // const tallarinesData = { image: 'http://images.com/1234', name: 'Tallarines con verdura', description: 'Tallarines con verdura', price: 4.25 }
        // const espaguetiData = { image: 'http://images.com/1234', name: 'Espagueti mediterráneo', description: 'Espagueti mediterráneo', price: 4.50 }
        // const macarronesIntegralesData = { image: 'http://images.com/1234', name: 'Macarrones integrales', description: 'Macarrones integrales desc', price: 4.50 }

        // // products riceCategory
        // const arrozIntegralData = { image: 'http://images.com/1234', name: 'Arroz integral', description: 'Arroz integral desc', price: 4.25 }
        // const arrozRemolachaData = { image: 'http://images.com/1234', name: 'Arroz con remolacha', description: 'Arroz con remolacha desc', price: 4.40 }
        // const risottoData = { image: 'http://images.com/1234', name: 'Risotto', description: 'Risotto desc', price: 4.50 }

        // // products vegetarianCategory
        // const ensaladaColData = { image: 'http://images.com/1234', name: 'Ensalada de col', description: 'Ensalada de Col desc', price: 3.75 }
        // const tacosFrijolesData = { image: 'http://images.com/1234', name: 'tacos de frijoles', description: 'tacos de frijoles desc', price: 4.25 }
        // const pastelesCamoteData = { image: 'http://images.com/1234', name: 'Pasteles de camotes', description: 'Pasteles de camotes desc', price: 4 }

        // // products veganCategory
        // const berenjenasData = { image: 'http://images.com/1234', name: 'Berenjenas al miso', description: 'Berenjenas al miso desc', price: 4.25 }
        // const salteadoBrocoliData = { image: 'http://images.com/1234', name: 'Salteado de Brocóli', description: 'Salteado de Brócoli desc', price: 4 }
        // const tortillaSinData = { image: 'http://images.com/1234', name: 'Tortilla sin huevos', description: 'Tortilla sin huevos desc', price: 4.50 }


        // const polloVerduras = new Product(polloVerdurasData).save()
        // const ternera = new Product(terneraData).save()
        // const polloArroz = new Product(polloArrozData).save()
        // const sopaVerduras = new Product(sopaVerdurasData).save()
        // const sopaMarisco = new Product(sopaMariscoData).save()
        // const pescadoPlancha = new Product(pescadoPlanchaData).save()
        // const salmon = new Product(salmonData).save()
        // const pescadoVerduras = new Product(pescadoVerdurasData).save()
        // const tallarines = new Product(tallarinesData).save()
        // const espagueti = new Product(espaguetiData).save()
        // const macarronesIntegrales = new Product(macarronesIntegralesData).save()
        // const arrozIntegral = new Product(arrozIntegralData).save()
        // const arrozRemolacha = new Product(arrozRemolachaData).save()
        // const risotto = new Product(risottoData).save()
        // const ensaladaCol = new Product(ensaladaColData).save()
        // const tacosFrijoles = new Product(tacosFrijolesData).save()
        // const pastelesCamote = new Product(pastelesCamoteData).save()
        // const berenjenas = new Product(berenjenasData).save()
        // const salteadoBrocoli = new Product(salteadoBrocoliData).save()
        // const tortillaSin = new Product(tortillaSinData).save()

        // const promisesProducts = [polloVerduras, ternera, polloArroz, sopaVerduras, sopaMarisco, pescadoPlancha, salmon, pescadoVerduras, tallarines, espagueti, macarronesIntegrales, arrozIntegral, arrozRemolacha, risotto, ensaladaCol, tacosFrijoles, pastelesCamote, berenjenas, salteadoBrocoli, tortillaSin]

        // const createProducts = createData(promisesProducts)

        // function createData(promises) {
        //     mongoose.connect(DB_URL)
        //         .then((connection) => {
        //             return Promise.all(promises)
        //                 .then(res => {
        //                     console.log(res)
        //                 })
        //                 .then(() => {
        //                     mongoose.connection.close()
        //                 })
        //         })
        //         .catch(console.error)
        // }


        // 'use strict'

        // require('dotenv').config()

        // const { mongoose, models: { User, Category, Product, Order } } = require('..')

        // const { env: { DB_URL } } = process

        // // WARN run this script from root folder: $ node demos/

        // mongoose.connect(DB_URL)
        //     .then(() => {
        //         // TODO insertions

        //         //Categories
        //         let beginnerCourseCategoryData = { name: 'Beginner Course', description: 'Beginner Course desc', image: 'http://images.com/230957' }
        //         let advancedCourseCategoryData = { name: 'Advanced Course', description: 'Advanced Course desc', image: 'http://images.com/259827' }

        //         //Products
        //         let beginnerCourseData = { name: 'Beginner Course I', price: 50, discount: 15, description: 'Beginner Course I desc', image: 'http://images.com/5678', stock: 123 }
        //         let beginnerCourseData2 = { name: 'Beginner Course II', price: 50, discount: 15, description: 'Beginner Course II desc', image: 'http://images.com/5679', stock: 11}
        //         let advancedCourseData = { name: 'Advanced Course I', price: 100, discount: 20, description: 'Advanced Course I desc', image: 'http://images.com/1234', stock: 77 }


        //         return Promise.all([
        //             Category.create(beginnerCourseCategoryData),
        //             Category.create(advancedCourseCategoryData)
        //         ])
        //             .then(res => {
        //                 console.log(res)

        //                 beginnerCourseData.category = res[0]._id
        //                 beginnerCourseData2.category = res[0]._id
        //                 advancedCourseData.category = res[1]._id

        //                 return Promise.all([
        //                     Product.create(beginnerCourseData),
        //                     Product.create(beginnerCourseData2),
        //                     Product.create(advancedCourseData),
        //                 ])
        //             })
        //     })
        //     .then(() => mongoose.disconnect())
        //     .then(() => console.log('done'))