
import {AnimalController} from '../../../controllers';
import {init_provider} from '../config/initPact';

const provider = init_provider();
describe('Given an Animal Service', () => {
    describe('When a request to delete an animal', () => {
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'delete animal',
                uponReceiving: 'Request to delete an animal',
                withRequest: {
                    method: 'DELETE',
                    path: '/animals/Loli'
                },
                willRespondWith: {
                    status: 204,

                }
            });
        });

        it("Then it should return the right data", async() => {
            const response = await AnimalController.delete('Loli');
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
});
