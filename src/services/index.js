import Adana from './cities/ADANA.json'
import Ankara from './cities/ANKARA.json'
import Bursa from './cities/BURSA.json'
import Gaziantep from './cities/GAZİANTEP.json'
import Istanbul from './cities/İSTANBUL.json'
import Izmir from './cities/İZMİR.json'
import Konya from './cities/KONYA.json'

class Cities {

    constructor() {
        this.cities = ["Adana", "Ankara", "Bursa", "Gaziantep", "Istanbul", "Izmir", "Konya"]
    }

    get cityList () {
        return this.cities
    }

    get Adana () {
        return Adana
    }

    get Ankara () {
        return Ankara
    }

    get Bursa () {
        return Bursa
    }

    get Gaziantep () {
        return Gaziantep
    }

    get Istanbul () {
        return Istanbul
    }

    get Izmir () {
        return Izmir
    }

    get Konya () {
        return Konya
    }
}

export default Cities = new Cities()
export const cityList = ["Adana", "Ankara", "Bursa", "Gaziantep", "Istanbul", "Izmir", "Konya"]