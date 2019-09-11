import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(repositories: {name: string}[], searchTerm: any): {name: string}[] {
    if (repositories && searchTerm) {
      return repositories.filter(repository => repository.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return repositories;
  }

}
