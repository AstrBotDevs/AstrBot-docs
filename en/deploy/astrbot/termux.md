# Deploy AstrBot Using Termux

> [!WARNING]
> The methods described in this tutorial are only applicable to Android devices. Apple devices do not have a true `Termux`.

> [!TIP]
> In this tutorial, unless otherwise specified, always answer `Y` or `y` to prompts like `Do you want to continue? [Y/n]` (or similar).

# Preparation Steps

<details>
<summary>Bash Basics</summary>

### Change Directory

```bash
cd /path/to/dir
cd ../ # Go back to the parent directory
```

### List Directory Contents

```bash
ls
```

### Delete Files or Directories

```bash
rm -r /path/to/dir/or/file # Add `-f` to force delete
```

### Run a `.sh` (`Shell`) File

```bash
bash xxx.sh
```
</details>

## Installing `Termux`

You can download Termux from the [official website](https://termux.dev/en) via [GitHub](https://github.com/termux/termux-app/releases) or [F-Droid](https://f-droid.org/en/packages/com.termux/).

<!--都英文版了还用啥换源啊-->

# Deployment

## Installing `proot-distro` and Other Necessary Components

First, install `uv`, `git`, and `proot-distro`.

```bash
pkg install uv git proot-distro
```

### Installing an `Ubuntu Environment` Using `proot-distro`

> [!TIP]
> Accessing GitHub from Mainland China can be unreliable; using a proxy or accelerator is recommended.

```bash
proot-distro install ubuntu
```

### Logging into the `Ubuntu Environment`

After the download and configuration are complete, you will see a prompt: `Log in with: proot-distro login ubuntu`. Enter that command to log in.

i.e.:

```bash
proot-distro login ubuntu
```

You are now inside the `Ubuntu environment`. Here, you will use the `apt` command to install packages.

## Adding a Third-Party PPA

> [!TIP]
> `Python 3.10` is not available in the official Ubuntu repositories. Since `uv` requires Python 3.10, this step is mandatory.

### Install `software-properties-common` (Prerequisite for adding PPAs) using `apt`

```bash
apt update && apt install software-properties-common
```

<details>
<summary>Encountered an error?</summary>

If you see an error like:

`Error: The repository 'https://ppa.launchpadcontent.net/deadsnakes/ppa/ubuntu questing Release' does not have a Release file.`
It means you are using a newer version of Ubuntu that this PPA doesn't yet support. Please downgrade your Ubuntu environment and try again.

</details>

### Adding the `deadsnakes` PPA

```bash
add-apt-repository ppa:deadsnakes/ppa && apt update
```

When prompted, you might see: `Press [ENTER] to continue or Ctrl-C to cancel.` Press the Enter key at this point.

## Installing `Python`

After completing the steps above, you can install `Python 3.10`.

```bash
apt install python3.10
```

## Cloning the `AstrBot` Repository

Ensure your current path is `~#` (the root of the Ubuntu environment) and not a subdirectory, to easily locate the project directory.

```bash
git clone https://github.com/AstrBotDevs/AstrBot.git && cd AstrBot
```
<details>
<summary>Having trouble downloading?</summary>

> [!NOTE]
> If `git clone` fails, the subsequent `cd` command will not execute successfully. Pay attention to your current path when running commands.
>
> If you need to run the clone command again, it's recommended to first run:
>
> ```bash
> rm -r AstrBot
> ```
>
> Then execute the `git clone` command again.
</details>
<br>

If everything went smoothly, you should now be in the `~/AstrBot#` directory and ready for the next step.

## Running `AstrBot`

```bash
uv sync
uv run main.py
```
Or
```bash
uv sync
uv run --no-sync main.py # Prevents uv from automatically syncing libraries, which might break plugins
```

> [!TIP]
> If downloading packages with `uv` is slow, you can change the mirror source

## Troubleshooting

>If you encounter an error like:
>```
>[WARN] uv sync failed, retry: 2/3
>  × Failed to build astrbot @ file:///root/
>  ├─▶ Failed to install requirements from build-system.requires
>  ├─▶ Failed to install build dependencies
>  ├─▶ Failed to install: trove_classifiers-2025.9.11.17-py3-none-any.whl
>  │   (trove-classifiers==2025.9.11.17)
>  ╰─▶ failed to hardlink file from
>      /root/.cache/uv/archive-v0/10gPuxc61Audvy1Eg6SFz/trove_classifiers/.>l2s.__init__.py0001
>      to
>      /root/.cache/uv/builds-v0/.tmp2lFVJx/lib/python3.10/site-packages/>trove_classifiers/.l2s.__init__.py0001:
>      Operation not permitted (os error 1)```

You can try running the following commands first, then restart AstrBot:

>```bash
>echo 'export UV_LINK_MODE=copy' >> ~/.bashrc 
>```
>
>```bash
>source ~/.bashrc
>```

## 🎉 Success!

If there are no errors, after `uv` installs the necessary packages, you should see output similar to `WebUI started, accessible at` followed by a few links.

If you see that, congratulations! You have successfully deployed and run `AstrBot`.

You can try accessing [http://localhost:6185](http://localhost:6185) to verify it's working.

Next, you will need to deploy a messaging platform to actually use AstrBot within it.

> [!TIP]
> `Termux` shares the network with the host device. This means `Termux`'s IP address is the same as your device's IP. You can use the `ifconfig` command within the Ubuntu environment to check the host's IP address.
>
> The default username and password for the WebUI are `astrbot` and `astrbot`.

# Afterword

## Exiting

To exit the `proot-distro` environment, use:

```bash
exit
```

## Restarting

Each time you reopen `Termux`, you need to restart the `proot` environment and launch `AstrBot`.

You can use the following commands:

```bash
proot-distro login ubuntu
cd AstrBot && uv run main.py
```

## Running in the Background

### Starting

To run multiple processes (e.g., `AstrBot` and `Napcat`) within one session, you can use:

```bash
uv run main.py &
......
```

### Stopping

Running a command with `&` will output something like `[1] 1145`. To stop the process, you can use:

```bash
kill -9 1145
```

or

```bash
pkill -9 -f "uv run main.py"
```

<!--This isn't very reliable though-->

> [!TIP]
> Using the `screen` command is recommended over `&` as it's easier to manage.
>
> ```bash
> apt install screen         # Install screen
> screen -S <name>           # Create a new session
> screen -r <name>           # Reattach to a session
> screen -ls                 # List sessions
> screen -X -S <name> quit   # Close a session
> Ctrl + a + d               # Detach from the current window
> ```

>[!WARNING]
> Remember to save your work properly before exiting to prevent data loss.

## Keeping the Process Alive in the Background

To allow the server to run persistently in the background, you may need to adjust your device's battery optimization settings. Go to `Settings` -> `Apps` -> `App Management` -> `Termux`, change its startup management to `Manual` and ensure `Allow background activity` (or similar options) is enabled.