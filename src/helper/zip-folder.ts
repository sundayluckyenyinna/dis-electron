import { zip } from 'zip-a-folder';

export default class FolderZipper
{
    constructor(){}

    static async zipFolderToDestination( folderPath : string, destinationPath : string ) : Promise<void>{
        await zip( folderPath, destinationPath );
    };

}