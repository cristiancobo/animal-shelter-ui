
import {init_provider} from '../config/initPact';
import { AnimalController } from "../../../controllers";
import {Matchers} from "@pact-foundation/pact";

const animal = {
    name: "Loli",
    breed: "Birmano",
    gender: "Male",
    vaccinated:true,
}


const provider = init_provider();
describe('Given An Animal Service', () =>{ 
    beforeAll(async ()=>{
        await provider.setup();
    });

   describe('When a request the animals create', () =>{
        beforeAll(async ()=>{
            await provider.addInteraction({
                uponReceiving: 'a request to get the animal created',
                state:"save animal",
                withRequest: {
                    method: 'POST',
                    path: '/animals',	
                    body: animal,		
                },
                willRespondWith: {
                    status:201,
                    body: Matchers.like(animal),
                }
            });
       });
        it("Then it should return the right data", async() => {
            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();        
            await provider.verify();
        });
    });
    afterAll(async ()=>{
        await provider.finalize();
    });
});