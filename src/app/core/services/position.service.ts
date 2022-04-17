import { Injectable } from '@angular/core';
import PositionsJson from '../../../assets/json/positions.json';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(

  ) { }

  /**
   * Save positions in Local Storage
   * Only if doesnt exist
   */
  public saveInLocalStorage() {

    const localStoragePositions = localStorage.getItem('positions');

    // If there is not agencies in local storage, set item for first time
    if(!localStoragePositions) {
      localStorage.setItem('positions', JSON.stringify(PositionsJson));
    }

  }

  /**
   * Get positions in local storage
   * @returns json or empty object
   */
  public index() {

    const localStoragePositions = localStorage.getItem('positions');

    return localStoragePositions ? JSON.parse(localStoragePositions) : [];
  }

}
