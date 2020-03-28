import { Injectable } from '@angular/core';

@Injectable()
export class PersonnelService {

    public personnelList: any[] = [
        {
            id: 1,
            name: 'Zemtsop Ndadji',
            surname: 'Brice Arléon',
        },
        {
            id: 2,
            name: 'ZeKekng Ndadji',
            surname: 'Maxime',
        },
        {
            id: 3,
            name: 'Nguedia Momo',
            surname: 'Marionne',
        },
        {
            id: 4,
            name: 'Vianney Gaston',
            surname: 'Ruben',
        },
    ];

    public constructor() {}

    public getPersonnelById(id: number) {
        return this.personnelList.find(person => person.id === id);
    }
}