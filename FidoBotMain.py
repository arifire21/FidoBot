import discord
# from discord_slash.utils.manage_commands import create_option
from discord.ext.commands import bot
from discord.ext import commands
import random
import BotPrivateVals

intents = discord.Intents.default()
intents.members = True
client = discord.Client(intents=intents)

# Change only the no_category default string
new_help_command = commands.DefaultHelpCommand(no_category = "Fido\'s Tricks!")

bot = commands.Bot(command_prefix = '$',
                    help_command = new_help_command,
                    intents = intents)      #check if needed

@bot.event
async def on_ready():
    print("Hi!")
    print("Logged in as user {0.user}".format(bot))

@bot.event
async def on_message(message):
    #check to see if bot can see all users, requires intents adjustment in developer portal
    if message.author.id == BotPrivateVals.owner_id and message.content.startswith('$member'):
        for guild in bot.guilds:
            for member in guild.members:
                #await message.channel.send("inside for loop")
                await message.channel.send(str(member)) # or do whatever you wish with the member detail

    #create inital message for color roles -- uncomment color reactions below
    if message.author.id == BotPrivateVals.owner_id and message.content.startswith("$colorroles"):
        await message.channel.send("Cool Collar Colors! :sparkles: React to one to change your name color! (when bot is online)")
    
    #workaround for role setup, to make bot react to own message, only needs to be used once
    #TODO: find proper fix for this
    # if message.author == bot.user:
    #     await message.add_reaction('🔴')
    #     await message.add_reaction('🟠')
    #     await message.add_reaction('🟡')
    #     await message.add_reaction('🟢')
    #     await message.add_reaction('🔵')
    #     await message.add_reaction('🟣')
    #     await message.add_reaction('🟤')
    #     await message.add_reaction("\U000026ab")      #(' :black_circle:')

    if message.author == bot.user:
        return

    if message.content.startswith("test"):
        await message.channel.send("received")
    
    await bot.process_commands(message)

#------------------------------------------------------------------#
#general purpose commands
#follow - prints link to devpost submission
@bot.command(help = "-- Look at our app!")
async def follow(ctx):
    await ctx.send("Follow Fido: https://devpost.com/software/follow-fido")

#speak
@bot.command(help = "-- Generates a random doggo sound")
async def speak(ctx):
    barktable = ["Arf!", "Woof!", "Yap!", "Bowwow!", "Bork!"]
    generated_bark = str(random.choice(barktable))
    await ctx.send("Fido says {0}".format(generated_bark))

#fetch
@bot.command(help = "-- What will Fido bring back?")
async def fetch(ctx):
    nums = ["1", "2", "3", "4", "5", "6", "7"]
    fetch_table_singular = ["bone", "squirrel", "tennis ball", "stick", "leash", "chew toy"]
    fetch_table_plural = ["bones", "squirrels", "tennis balls", "sticks", "leashes", "chew toys"]
    generated_num = str(random.choice(nums))
    if generated_num == "1":
        generated_fetch = str(random.choice(fetch_table_singular))
    else:
        generated_fetch = str(random.choice(fetch_table_plural))
    combined = str(generated_num + " " + generated_fetch)
    await ctx.send("Fido brought back {0}".format(combined))

#treat
@bot.command(help = "-- (arg: whole number) Give Fido a treat! [In development]")
async def treat(ctx, arg : int):
    if arg == 1:
        print("in command")
        increment_treat(arg)
        print(BotPrivateVals.total_treats)
        await ctx.send("You gave Fido 1 treat!\nTotal treats given: " + str(BotPrivateVals.total_treats))
    else:
        print("in command")
        increment_treat(arg)
        print(BotPrivateVals.total_treats)
        await ctx.send("You gave Fido {0} treats!\nTotal treats given: ".format(arg) + str(BotPrivateVals.total_treats))

@treat.error
async def show_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("You need to specify a whole number of treats!")

#small method for treat, variable test
def increment_treat(num):
    BotPrivateVals.total_treats = BotPrivateVals.total_treats + num

#bite
# @bot.command(help = "-- bite a random user")
# async def bite(ctx):
#     # user = random.choice(message.channel.guild.members)
#     user = random.choice(channel.guild.members)
#     print(str(user))
#     # await ctx.send("@" + user + " was bitten by Fido!")
#     await ctx.send("check console log")

# @bite.error
# async def show_error(ctx, error):
#     if isinstance(error, commands.):
#         await ctx.send("You need to specify a whole number of treats!")

#lol
@bot.command(help = "-- lol")
async def bark(ctx):
    await ctx.send("@everyone")

#------------------------------------------------------------------#
#Role Testing -- Colors
@bot.event
async def on_raw_reaction_add(payload):
    message_id = payload.message_id
    if message_id == BotPrivateVals.color_role_msg_id or message_id == BotPrivateVals.cyber_space_color_role_msg_id: #id of message with roles, current id is only message w all 8 colors
        guild_id = payload.guild_id
        guild = discord.utils.find(lambda g : g.id == guild_id, bot.guilds) #searching thru all guilds that bot can see
        
        if payload.emoji.name == '🔴':
            role = discord.utils.get(guild.roles, name = 'Red')
            # print('role found')
        elif payload.emoji.name == '🟢':
            role = discord.utils.get(guild.roles, name = 'Green')
            # print('role found')
        elif payload.emoji.name == '🔵':
            role = discord.utils.get(guild.roles, name = 'Blue')
            # print('role found')
        elif payload.emoji.name == '🟡':
            role = discord.utils.get(guild.roles, name = 'Yellow')
            # print('role found')
        elif payload.emoji.name == '🟠':
            role = discord.utils.get(guild.roles, name = 'Orange')
            # print('role found')
        elif payload.emoji.name == '🟤':
            role = discord.utils.get(guild.roles, name = 'Brown')
            # print('role found')
        elif payload.emoji.name == '🟣':
            role = discord.utils.get(guild.roles, name = 'Purple')
            # print('role found')
        elif payload.emoji.name == '\U000026ab':
            role = discord.utils.get(guild.roles, name = 'Black')
            # print('role found')
        else:
            role = discord.utils.get(guild.roles, name = payload.emoji.name)    #catch in case???
        
        if role is not None:
            member_id = payload.user_id
            member = discord.utils.find(lambda m : m.id == payload.user_id, guild.members) #collection of all members
            if member is not None:
                await member.add_roles(role)
                print("role added successfully to {0}".format(member) + " in {0}.".format(guild.name))
            else:
                print("Member not found when adding role in {0}.".format(guild.name))
        else:
            print("Role not found found when adding role in {0}.".format(guild.name))

#REMOVE role when user un-reacts
@bot.event
async def on_raw_reaction_remove(payload):
    message_id = payload.message_id
    if message_id == BotPrivateVals.color_role_msg_id or message_id == BotPrivateVals.cyber_space_color_role_msg_id: #id of message with roles, current id is only message w all 8 colors
        guild_id = payload.guild_id
        guild = discord.utils.find(lambda g : g.id == guild_id, bot.guilds) #searching thru all guilds that bot can see
        
        if payload.emoji.name == '🔴':
            role = discord.utils.get(guild.roles, name = 'Red')
            # print('role found')
        elif payload.emoji.name == '🟢':
            role = discord.utils.get(guild.roles, name = 'Green')
            # print('role found')
        elif payload.emoji.name == '🔵':
            role = discord.utils.get(guild.roles, name = 'Blue')
            # print('role found')
        elif payload.emoji.name == '🟡':
            role = discord.utils.get(guild.roles, name = 'Yellow')
            # print('role found')
        elif payload.emoji.name == '🟠':
            role = discord.utils.get(guild.roles, name = 'Orange')
            # print('role found')
        elif payload.emoji.name == '🟤':
            role = discord.utils.get(guild.roles, name = 'Brown')
            # print('role found')
        elif payload.emoji.name == '🟣':
            role = discord.utils.get(guild.roles, name = 'Purple')
            # print('role found')
        elif payload.emoji.name == '\U000026ab':
            role = discord.utils.get(guild.roles, name = 'Black')
            # print('role found')
        else:
            role = discord.utils.get(guild.roles, name = payload.emoji.name)
        
        if role is not None:
            member_id = payload.user_id
            member = discord.utils.find(lambda m : m.id == payload.user_id, guild.members) #collection of all members
            if member is not None:
                await member.remove_roles(role)
                print("role removed successfully from {0}".format(member) + " in {0}.".format(guild.name))
            else:
                print("Member not found when removing role in {0}.".format(guild.name))
        else:
            print("Role not found when removing in {0}.".format(guild.name))

bot.run(BotPrivateVals.fido_bot_key)