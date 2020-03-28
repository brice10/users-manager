import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable()
export class PersonnelService {

    public personnelList: User[] = [
        {
            id: '1',
            name: 'Zemtsop Ndadji',
            surname: 'Brice Arléon',
            email: 'arleonzemtsop@gmail.com',
            photoUrl: './../../assets/personnel2.jpg',
            password: 'admin1',
        },
        {
            id: '2',
            name: 'ZeKekng Ndadji',
            surname: 'Maxime',
            email: 'zekengmaxime@gmail.com',
            photoUrl: './../../assets/personnel4.jpg',
            password: 'admin2',
        },
        {
            id: '3',
            name: 'Nguedia Momo',
            surname: 'Marionne',
            email: 'nguediamomo@gmail.com',
            photoUrl: './../../assets/personnel5.jpg',
            password: 'personnel1',
        },
        {
            id: '4',
            name: 'Mvondo Momo',
            surname: 'Ndolo',
            email: 'mvondo@gmail.com',
            photoUrl: './../../assets/personnel7.jpg',
            password: 'personnel2',
        },
        {
            id: '5',
            name: 'Ngnizeko Momo',
            surname: 'Arnold',
            email: 'arnold@gmail.com',
            photoUrl: './../../assets/personnel4.jpg',
            password: 'personnel3',
        },
        {
            id: '6',
            name: 'Nguefack Momo',
            surname: 'Djibril',
            email: 'nguefack@gmail.com',
            photoUrl: './../../assets/personnel7.jpg',
            password: 'personnel4',
        },
    ];

    public constructor() {}

    public getPersonnelById(id: string) {
        return this.personnelList.find(person => person.id === id);
    }

    public createPersonnel(personnel: User) {
        this.personnelList.push(personnel);
    }

    public updateUser(editedUser: User) {
        const index = editedUser
                      ? this.personnelList.findIndex(member => member.id === editedUser.id)
                      : -1;
        if(index > -1) {
          this.personnelList[index] = editedUser;
        }
    }
}