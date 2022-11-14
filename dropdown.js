/*!
 * Dropdown list by WaroonRat Thailand v1.0.0: credit 
 * (c) 2022 gukkghu Mr Waroonporn Rattanbutchai
 * 
 * 
 */


class GukkghuDropDownByWaroonRat {

    constructor(data){this.data = data; this.targets = []
    }

    filterData(filtersAsArray){
        return this.data.filter(r=> filtersAsArray.every((item,i) => item === r[i]));
    }

    getUniqueValues(dataAsArray,index){

        const uniqueOptions = new Set();
        dataAsArray.forEach(r => uniqueOptions.add(r[index])) 
        return [...uniqueOptions]
    }

    populateDropDown(el,listArray){
        el.innerHTML = "";
    
        listArray.forEach(item => {
            const option = document.createElement("option");
            option.textContent = item;
            el.appendChild(option)
        });
    }

    createPopulateDropDownFunction(el,elsDependsOn){
        return ()=>{
            const elsDependsOnValues = elsDependsOn.length === 0 ? null : elsDependsOn.map(depEl => depEl.value);
            const dataTouse = elsDependsOn.length === 0 ? this.data : this.filterData(elsDependsOnValues);
            const listTouse = this.getUniqueValues(dataTouse,elsDependsOn.length);
            this.populateDropDown(el,listTouse)
        }
    }


    add(options){
        // {target: "level1", dependsOn: []}
        const el = options.target;
        const elsDependsOn = options.dependsOn.length === 0 ? [] : options.dependsOn;
        const eventFunction = this.createPopulateDropDownFunction(el,elsDependsOn);
        const targetObject = {el: el, elsDependsOn: elsDependsOn,func: eventFunction};
        targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change",eventFunction))
        this.targets.push(targetObject)    
        return this;
    }

    initialize(){
        this.targets.forEach(t => t.func());
        return this;
    }

    eazyDropDown(arrOfElements){
        arrOfElements.forEach((item,i) => {
            const option = {target: item, dependsOn: arrOfElements.slice(0,i) };
            this.add(option);
        });
        this.initialize();
        return this;

    }

    eazyDropDownByIds(arrayOfIds){
        this.eazyDropDown(arrayOfIds.map(id => document.getElementById(id)));
    }


}
