import yaml
stream = open("../nodeconfig.yaml", 'r')
dictionary = yaml.load(stream,Loader=yaml.Loader)

meta   = dictionary['meta']
cryptochain = dictionary['cryptochain'][0]