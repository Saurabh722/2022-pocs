FABRIC CLI

## Getting Started

1. Go to same projects dir or any (preferred is projects dir).
2. clone or download `ssh://git@stash.lbidts.com/~sasharma/fabric-cli.git`.
4. Run `npm link` will create a symlink in the global folder.
3. Run `npm i` to build all of the Node dependencies.

## Use Local FABRIC-CLI

1. Follow the `Getting Started` instructions above.
2. To create default template
	1. Run `fab` (this will generate 'hello-world' responsive template inside components folder).
	2. Run `fab <template_name>` (this will generate responsive <template_name> inside components folder)


3. To Create specific type of template
	1. Run `fab <type> <template_name>` (for responsive template).
	
	example:-
	`fab component hello-fabric`
	
	or
	
	`fab c hello-fabric`
	
	above cammand will generate responsive component-template inside components folder.
	
	Also 
	
	`fab c pocs/hello-fabric`
	
	above cammand will generate responsive component-template inside components/pocs folder

	similarly
	
	type can be:
	
		c and component for Component type,
		e and element for Elements type
		t and template for Templates type
   		u, util and utility element for Utilities type.


	2. Run `fab <type> <template_name> -r` (for non-responsive template)
	
	example:-
	
	`fab component hello-fabric -r`
	
	or
	
	`fab c hello-fabric -r`
	
	above cammand will generate non-responsive component-template inside component Folder

	Also 
	
	`fab c pocs/hello-fabric -r`
	
	above cammand will generate non-responsive component-template inside components/pocs Folder

3. To Import Component

	1. Run `fab import <type> <target_template> <destination_template>` (for non-responsive template).
	
	example:
	
		fab import c search-form hello-world,
		or
		fab i c search-form hello-world
	  
